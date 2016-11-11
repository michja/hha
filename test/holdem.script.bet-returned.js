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
  spok(t, res.actions.turn.pop(),
    { $topic: 'last turn action'
    , action:
      { type: 'bet-returned'
      , ratio: 0.1
      , allin: false
      , amount: 325
      , pot: 4425
      , potAfter: 4100
      , chips: 0
      , chipsAfter: 325
      , bet: 1 }
    , playerIndex: 0 })
  t.end()
})
