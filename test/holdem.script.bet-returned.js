'use strict'

const test = require('tape')
const spok = require('spok')
const analyze = require('../')
const script = analyze.script

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
const save = require('./util/save')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

test('\nplayer all-in vs. smaller stack has uncalled bet returned to him', function(t) {
  const hand = require('./fixtures/holdem/uncalled-bet-returned.json')
  const analyzed = analyze(hand)
  const res = script(analyzed)

  spok(t, res.actions.turn,
    [ { action:
        { type: 'bet'
        , ratio: 0.2
        , allin: true
        , amount: 710
        , pot: 3330
        , potAfter: 4040
        , chips: 710
        , chipsAfter: 0
        , bet: 1
        , chipsInFront: 710 }
     , playerIndex: 0 }
    , { action:
        { type: 'call'
        , ratio: 0.1
        , allin: true
        , amount: 385
        , pot: 4040
        , potAfter: 4425
        , chips: 385
        , chipsAfter: 0
        , bet: 1
        , chipsInFront: 385 }
     , playerIndex: 3 }
    , { action:
        { type: 'bet-returned'
        , ratio: 0.1
        , allin: false
        , amount: 325
        , pot: 4425
        , potAfter: 4100
        , chips: 0
        , chipsAfter: 325
        , bet: 1
        , chipsInFront: 1035 }
     , playerIndex: 0 } ])
  t.end()
})
