'use strict'

const putMoneyIn = {
    fold    : false
  , check   : false
  , collect : false
  , post    : true
  , call    : true
  , bet     : true
  , raise   : true
}

const cardsOnBoard = {
    preflop  : 0
  , flop     : 3
  , turn     : 4
  , river    : 5
  , showdown : 5
}

/**
 * Takes a script of actions and calculates the states for each.
 * Adds pointers to the state at the beginning of each script.
 *
 * This is useful if you try to jump around in the hand and reset
 * the state of the table.
 *
 * @name hha:storyboard
 * @function
 * @param {Object} script created via @see hha:script
 */
module.exports = function storyboard(script) {
  const states = []

  //
  // initially
  //
  function getVal(acc, k) {
    if (script.board[k]) acc.push(script.board[k])
    return acc
  }

  const board = script.board && Object.keys(script.board).reduce(getVal, []) || []

  // will be sparse if not all players present
  let seats = new Array(script.table.maxseats + 1)
  function addSeat(p, idx) {
    seats[p.seatno] = {
        chips       : p.chipsPreflop
      , name        : p.name
      , m           : p.m
      , sb          : p.sb
      , bb          : p.bb
      , button      : p.button
      , action      : null
      , amount      : 0
      , bet         : 0
      , investedBet : p.bb ? 1 : 0
      , holecards   : p.cards || { card1 : '??', card2 : '??' }
      , playerIdx   : idx
      , seatno      : p.seatno
    }
  }
  script.players.forEach(addSeat)

  //
  // From now on we always map seats even though we reuse the variable
  // in order to avoid affecting previous states
  //

  function resetSeat(s) {
    const street = this.street
    const stage  = this.stage

    const preflop = street === 'preflop'
    const chipsName = 'chips' + street[0].toUpperCase() + street.slice(1)
    const p = script.players[s.playerIdx]
    const chips = p[chipsName]
    return Object.assign({}, seats[p.seatno], {
        chips       : chips
      , action      : null
      , amount      : 0
      , bet         : 0
      , investedBet : preflop && p.bb ? 1 : 0
      , _lastUpdate : stage
    })
  }

  function adaptSeat(s, idx) {
    const p = this.p
    const a = this.a
    const stage = this.stage
    if (typeof s === 'undefined' || p.seatno !== idx) return s

    // cards are not at player's seat anymore after he folded
    const folded = a.type === 'fold'
    const holecards = folded ? null : s.holecards
    const investedBet = putMoneyIn[a.type] ? a.bet : s.investedBet
    return Object.assign({}, s, {
        chips       : a.chipsAfter
      , action      : a.type
      , amount      : a.amount
      , bet         : a.bet || 0
      , investedBet : investedBet || 0
      , holecards   : holecards
      , folded      : folded
      , _lastUpdate : stage
    })
  }

  let streetIdxs = {
      preflop  : null
    , flop     : null
    , turn     : null
    , river    : null
    , showdown : null
  }

  const folded = {}

  function addFolded() {
    for (var i = 0; i < seats.length; i++) {
      const s = seats[i]
      if (s && s.folded) folded[s.seatno] = true
    }
  }

  function collectAction(street) {
    const flop = street === 'flop'
    function tocollect(acc, s) {
      if (folded[s.seatno]) return acc

      // small blinds posted and their bet size is 0 (half a blind)
      // however if they invested more we'll use that amount
      if (s.sb && flop) {
        acc.push({ seatno: s.seatno, bet: s.investedBet || 0 })

      // big blinds need to have their big blind collected at least
      } else if (s.bb) {
        acc.push({ seatno: s.seatno, bet: Math.max(1, (s.investedBet || 0)) })

      // all others have no chips in front of them if they didn't invest
      } else if (s.investedBet) {
        acc.push({ seatno: s.seatno, bet: s.investedBet })
      }
      return acc
    }

    return seats.reduce(tocollect, [])
  }

  function withHolecards(x) {
    return x && !!x.holecards
  }

  function isButton(x) {
    return x && !!x.button
  }

  function getSeatno(x) {
    return x.seatno
  }

  function processStreet(street) {
    const actions = script.actions[street]
    const onboard = cardsOnBoard[street] || 0
    const currentBoard = board.slice(0, onboard)
    const preflop = street === 'preflop'
    const showdown = street === 'showdown'

    // collect chips first if we made it to flop, turn, river or showdown
    const collect = !preflop ? collectAction() : []
    // mark folded players so we don't collect their chips again on next street
    addFolded()

    seats = seats.map(resetSeat, { street: street, stage: street })
    const dealerAction = {
      collect: collect
    }
    if (!preflop && !showdown) {
      dealerAction.board = {
          street: street
        , onboard: cardsOnBoard[street]
      }
    }

    if (preflop) {
      const button = seats.filter(isButton).map(getSeatno)[0]
      dealerAction.dealtCards = {
        seatnos: seats.filter(withHolecards).map(getSeatno)
      }
      if (button) {
        dealerAction.button = {
          seatno: button
        }
      }
    }

    // This state is identical to the first action on the street, except the
    // action hasn't executed.
    // Thus it clears up all chips in front of the players and adds cards
    // to the board.
    states.push({
        board        : currentBoard
      , boardChanged : street !== 'showdown'
      , pot          : 0
      , action       : false
      , stage        : street
      , seats        : seats
      , dealerAction : dealerAction
    })
    streetIdxs[street] = states.length - 1

    for (var i = 0; i < actions.length; i++) {
      const action = actions[i]
      const p = script.players[action.playerIndex]
      const a = action.action
      const stage = street + '+' + (i + 1)

      seats = seats.map(adaptSeat, { p: p, a: a, stage: stage })
      action.seatno = p.seatno
      states.push({
          board        : currentBoard
        , boardChanged : false
        , pot          : street === 'showdown' ? 0 : a.potAfter
        , action       : action
        , stage        : stage
        , seats        : seats
      })
    }
  }

  processStreet('preflop')
  processStreet('flop')
  processStreet('turn')
  processStreet('river')
  processStreet('showdown')

  return { info: script.info, board: script.board, states: states, streets: streetIdxs }
}
