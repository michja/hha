'use strict'

function ignoreStreets(p) {
  function copy(acc, k) {
    if (k === 'preflop' || k === 'flop' || k === 'turn' || k === 'river' || k === 'showdown') return acc
    acc[k] = p[k]
    return acc
  }
  return Object.keys(p).reduce(copy, {})
}

function addIndex(p, idx) {
  p.index = idx
}

function byPreflopOrder(p1, p2) {
  return p1.preflopOrder - p2.preflopOrder
}

function byPostflopOrder(p1, p2) {
  return p1.postflopOrder - p2.postflopOrder
}

function addAction(actions, action, player) {
  actions.push({ action: action, playerIndex: player.index })
}

function addStreet(acc, streetName, ps) {
  const actions = []
  const chipsInFronts = new Array(ps.length).fill(0)
  let ia = 0
  let keepGoing = true
  const ispreflop = streetName === 'preflop'
  while (keepGoing) {
    keepGoing = false
    for (var ip = 0; ip < ps.length; ip++) {
      const p = ps[ip]
      if (ispreflop) {
        chipsInFronts[ip] = p.chipsInFront
      }
      const street = p[streetName]
      const action = street.length > ia && street[ia]
      keepGoing = keepGoing || !!action
      if (action) {
        addAction(actions, action, p)
        if (typeof action.amount === 'number') {
          chipsInFronts[ip] += action.amount
        }
        action.chipsInFront = chipsInFronts[ip]
      }
    }
    ia++
  }
  acc[streetName] = actions
}

/**
 * Scripts what happened in a hand into a actions script array.
 * This array can be read top down to replay the hand.
 *
 * The players and info fields from the analyzed data are copied over.
 * Each action includes the index at which the player that's executing
 * the action can be found in the players array.
 *
 * Structure of returned object:
 *
 * ```
 * info: object containing hand info
 * table: object containing info about the table like total seats
 * board: object cards on the board
 * players: array of all players at the table including all info about their stacks
 * actions:
 *  preflop  : array of preflop actions
 *  flop     : array of flop actions
 *  turn     : array of turn actions
 *  river    : array of river actions
 *  showdown : array of showdown actions
 * ```
 *
 * @name hhr::script
 * @function
 * @param {object} data analyzed hand data @see hhr()
 * @return {object}
 */
module.exports = function script(data) {
  const hand = {
      info: data.info
    , table: data.table
    , board: data.board
    , pots: data.pots
  }

  function addChipsInFront(p) {
    if (p.sb) {
      p.chipsInFront = data.info.sb
    } else if (p.bb) {
      p.chipsInFront = data.info.bb
    } else {
      p.chipsInFront = 0
    }
    return p
  }

  data.players.forEach(addChipsInFront)
  hand.players = data.players.map(ignoreStreets)

  data.players.forEach(addIndex)

  const actions = {}
  // preflop
  data.players.sort(byPreflopOrder)
  addStreet(actions, 'preflop', data.players)

  // flop, turn, river, showdown
  data.players.sort(byPostflopOrder)
  addStreet(actions, 'flop', data.players)
  addStreet(actions, 'turn', data.players)
  addStreet(actions, 'river', data.players)
  addStreet(actions, 'showdown', data.players)

  hand.actions = actions
  return hand
}
