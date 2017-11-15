'use strict'

/* eslint-disable camelcase */
//            [ exact, range ]
const sb     = [ 'sb', 'sb' ]
const bb     = [ 'bb', 'bb' ]
const utg    = [ 'utg', 'ea' ]
const utg1   = [ 'utg+1', 'ea' ]
const utg2   = [ 'utg+2', 'ea' ]
const mp     = [ 'mp', 'mp' ]
const lj     = [ 'lj', 'mp' ]
const hj     = [ 'hj', 'lt' ]
const co     = [ 'co', 'co' ]
const bu     = [ 'bu', 'bu' ]

// 0 based .. substract 2
const table = [
    // headsup
    [ sb, bb ]
    // 3 players
  , [ bu, sb, bb ]
    // 4 players
  , [ co, bu, sb, bb ]
    // 5 players
  , [ utg, co, bu, sb, bb ]
    // 6 players
  , [ utg, utg1, co, bu, sb, bb ]
    // 7 players
  , [ utg, utg1, hj, co, bu, sb, bb ]
    // 8 players
  , [ utg, utg1, lj, hj, co, bu, sb, bb ]
    // 9 players
  , [ utg, utg1, utg2, lj, hj, co, bu, sb, bb ]
    // 10 players
  , [ utg, utg1, utg2, mp, lj, hj, co, bu, sb, bb ]
]

// Determined  by number of active players at table
// using acting order preflop
exports = module.exports = function strategicPositions(order, activePlayers) {
  // in one case we saw the order too large for the given active players
  const noplayers = Math.max(activePlayers - 2, order - 1)
  const cell = table[noplayers][order]
  return {
      exactPos: cell[0]
    , pos: cell[1]
  }
}

// ordered by postflop position
exports.list = [ 'sb', 'bb', 'ea', 'mp', 'lt', 'co', 'bu' ]
