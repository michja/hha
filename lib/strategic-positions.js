'use strict'

/* eslint-disable camelcase */
//            [ exact, range ]
const sb     = [ 'sb', 'sb' ]
const bb     = [ 'bb', 'bb' ]
const bu     = [ 'bu', 'bu' ]
const co     = [ 'co', 'co' ]
const utg    = [ 'utg', 'ea' ]
const utg1   = [ 'utg+1', 'ea' ]
const utg2   = [ 'utg+2', 'ea' ]
const mp1_mp = [ 'mp1', 'mp' ]
const mp2_mp = [ 'mp2', 'mp' ]
const mp1_lt = [ 'mp1', 'lt' ]
const mp2_lt = [ 'mp2', 'lt' ]
const mp3_lt = [ 'mp3', 'lt' ]

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
  , [ utg, utg1, mp1_lt, co, bu, sb, bb ]
    // 8 players
  , [ utg, utg1, utg2, mp1_lt, co, bu, sb, bb ]
    // 9 players
  , [ utg, utg1, utg2, mp1_mp, mp2_lt, co, bu, sb, bb ]
    // 10 players
  , [ utg, utg1, utg2, mp1_mp, mp2_mp, mp3_lt, co, bu, sb, bb ]
]

// Determined  by number of active players at table
// using acting order preflop
exports = module.exports = function strategicPositions(order, activePlayers) {
  const cell = table[activePlayers - 2][order]
  return {
      exactPos: cell[0]
    , pos: cell[1]
  }
}

exports.list = [ 'sb', 'bb', 'bu', 'co', 'ea', 'mp', 'lt' ]
