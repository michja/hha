'use strict'

const test = require('tape')
const spok = require('spok')
const analyze = require('../')

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
const save = require('./util/save')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

test('\nplayer pushes out other player on flop and collects $491 from pot', function(t) {
  const hand = require('./fixtures/holdem/collect-amount.json')
  const res = analyze(hand)
  spok(t, res.players[2].flop,
    [ { type: 'raise'
     , ratio: 12.3
     , allin: true
     , amount: 1381
     , pot: 379
     , potAfter: 1760
     , chips: 1381
     , chipsAfter: 0
     , bet: 2 }
    , { type: 'collect'
     , ratio: 3.6
     , allin: false
     , amount: 491
     , pot: 1760
     , potAfter: 0
     , chips: 0
     , chipsAfter: 1760
     , bet: 2 } ])
  t.end()
})
