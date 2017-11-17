'use strict'

function getHeader(hand) {
  const info = hand.info
  const table = hand.table
  return {
      room      : info.room
    , gametype  : info.gametype
    , currency  : info.currency || '$'
    , donation  : info.donation != null ? info.donation : 10
    , rake      : info.rake != null     ? info.rake     : 1
    , pokertype : info.pokertype
    , limit     : info.limit
    , sb        : info.sb
    , bb        : info.bb
    , ante      : info.ante
    , level     : info.level
    , maxseats  : table.maxseats
  }
}

function determinePosition(p) {
  return (
      p.exactPos != null ? p.exactPos
    : p.pos != null ? p.pos
    : `SEAT${p.seatno}`
  ).toUpperCase()
}

function amountInBB(amount, bb) {
  return Math.round(amount * 10 / bb) / 10
}

function getSeats(hand) {
  const bb = hand.info.bb
  const players = hand.players
  const seats = []
  var hero
  const preflopSummary = {}
  for (var i = 0; i < players.length; i++) {
    const p = players[i]
    const pos = determinePosition(p)
    const chipsBB = amountInBB(p.chips, bb)
    const chipsAmount = p.chips
    const seat = { pos: pos, chipsBB: chipsBB, chipsAmount: chipsAmount, hero: !!p.hero }
    if (seat.hero) {
      hero = seat
      hero.m = p.m
      preflopSummary.cards = p.cards
      preflopSummary.pos = seat.pos
    }
    seats.push(seat)
  }
  return { seats: seats, hero: hero, preflopSummary: preflopSummary }
}

function istourney(type) {
  return /tournament/.test(type)
}

function getChipStackRatio(gametype, bb, p) {
  const tourney = istourney(gametype)
  var label, amount
  if (tourney) {
    label = 'M'
    amount = p.m
  } else {
    label = 'BB'
    amount = p.chipsBB
  }
  return { label: label, amount: amount }
}

function activeAction(x) {
  return x.action.type !== 'collect' && x.action.type !== 'bet-returned'
}

function resolvePlayer(hand, idx) {
  return hand.players[idx]
}

function getPlayerActions(hand, actions) {
  var folds = 0
  const bb = hand.info.bb
  actions = actions.filter(activeAction)

  const playerActions = []

  for (var i = 0; i < actions.length; i++) {
    const action = actions[i]
    const a = action.action

    if (a.type === 'fold') {
      folds++
      continue
    }

    if (folds > 0) {
      playerActions.push({ type: 'folds', number: folds })
      folds = 0
    }

    const p = resolvePlayer(hand, action.playerIndex)
    const playerAction = { pos: determinePosition(p), type: a.type }
    if (a.type === 'call' || a.type === 'bet' || a.type === 'raise') {
      playerAction.amountBB = amountInBB(a.amount, bb)
      playerAction.amount = a.amount
    }

    playerActions.push(playerAction)
  }

  if (folds > 0) {
    playerActions.push({ type: 'folds', number: folds })
  }

  return playerActions
}

function resolvePlayersInvolved(actions) {
  const idxs = {}
  for (var i = 0; i < actions.length; i++) {
    const action = actions[i]
    idxs[action.playerIndex] = true
  }
  return Object.keys(idxs).length
}

function getFlopSummary(hand, bb) {
  const board = hand.board
  if (board == null) return null

  const card1 = board.card1
  const card2 = board.card2
  const card3 = board.card3
  if (card1 == null || card2 == null || card3 == null) return null

  const pot = hand.pots.flop
  const potBB = amountInBB(pot, bb)

  const playersInvolved = resolvePlayersInvolved(hand.actions.flop)

  return { pot: pot, potBB: potBB, board: [ card1, card2, card3 ], playersInvolved: playersInvolved }
}

function getTurnSummary(hand, bb) {
  const board = hand.board
  if (board == null) return null

  const card = board.card4
  if (card == null) return null

  const pot = hand.pots.turn
  const potBB = amountInBB(pot, bb)

  const playersInvolved = resolvePlayersInvolved(hand.actions.turn)

  return { pot: pot, potBB: potBB, board: card, playersInvolved: playersInvolved }
}

function getRiverSummary(hand, bb) {
  const board = hand.board
  if (board == null) return null

  const card = board.card5
  if (card == null) return null

  const pot = hand.pots.river
  const potBB = amountInBB(pot, bb)

  const playersInvolved = resolvePlayersInvolved(hand.actions.river)

  return { pot: pot, potBB: potBB, board: card, playersInvolved: playersInvolved }
}

function amounts(amount, bb) {
  return { amount: amount, bb: amountInBB(amount, bb) }
}

function getTotalPot(hand) {
  // basically looking for the largest number in the dumbest way possible :P (most likely also fastest)
  const bb = hand.info.bb
  const pots = hand.pots
  if (pots == null) return 0
  var max = 0
  if (pots.preflop == null) return amounts(max, bb)
  max = pots.preflop
  if (pots.flop == null) return amounts(max, bb)
  max = Math.max(max, pots.flop)
  if (pots.turn == null) return amounts(max, bb)
  max = Math.max(max, pots.turn)
  if (pots.river == null) return amounts(max, bb)
  max = Math.max(max, pots.river)
  if (pots.showdown == null) return amounts(max, bb)
  return amounts(Math.max(max, pots.showdown), bb)
}

function getSpoilers(players) {
  const spoilers = []
  for (var i = 0; i < players.length; i++) {
    const p = players[i]
    if (p.hero || p.cards == null || p.cards.card1 == null || p.cards.card2 == null) continue
    const pos = determinePosition(p)
    spoilers.push({ pos: pos, cards: p.cards })
  }
  return spoilers
}

/**
 * Converts a hand that was analyzed and then scripted to a summary representation.
 *
 * The summary has the following properties:
 *
 *  - header: contains game info, like room, pokertype, blinds, etc.
 *  - seats: lists the seats of the players including pos, chips and hero indicators
 *  - chipsStackRatio: hero's M for tournaments, his BBs for cash games
 *  - preflopSummary: hero's cards and position
 *  - preflopActions: action types + amounts of each player by position
 *  - flopSummary: pot at flop, board and playersInvolved
 *  - flopActions: same as preflopActions
 *  - turnSummary: pot at turn, turn card and playersInvolved
 *  - turnActions: same as preflopActions
 *  - riverSummary: pot at river, river card and playersInvolved
 *  - riverActions: same as preflopActions
 *  - totalPot: total money in the pot
 *  - spoilers: players whos cards are known by position
 *
 * @name hha.summary
 *
 * @function
 * @param {Object} script
 * @returns {Object} the hand summarized
 */
function summary(hand) {
  const res = {}
  if (hand.players == null || hand.players.length === 0) return res

  const bb = hand.info.bb

  res.header = getHeader(hand)
  const seatsInfo = getSeats(hand)
  res.seats = seatsInfo.seats
  res.chipStackRatio = seatsInfo.hero != null
    ? getChipStackRatio(res.header.gametype, res.header.bb, seatsInfo.hero)
    : null
  res.preflopSummary = seatsInfo.preflopSummary
  res.preflopActions = getPlayerActions(hand, hand.actions.preflop)

  if (hand.actions.flop != null && hand.actions.flop.length > 0) {
    res.flopSummary = getFlopSummary(hand, bb)
    res.flopActions = getPlayerActions(hand, hand.actions.flop)
  }

  if (hand.actions.turn != null && hand.actions.turn.length > 0) {
    res.turnSummary = getTurnSummary(hand, bb)
    res.turnActions = getPlayerActions(hand, hand.actions.turn)
  }

  if (hand.actions.river != null && hand.actions.river.length > 0) {
    res.riverSummary = getRiverSummary(hand, bb)
    res.riverActions = getPlayerActions(hand, hand.actions.river)
  }

  res.totalPot = getTotalPot(hand)
  res.spoilers = getSpoilers(hand.players)

  return res
}

module.exports = summary
