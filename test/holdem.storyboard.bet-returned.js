'use strict'

const test = require('tape')
const spok = require('spok')
const hha = require('../')

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
const save = require('./util/save')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

test('\nstoryboard of action on all', function(t) {
  const hand = require('./fixtures/holdem/uncalled-bet-returned.json')
  const analyzed = hha(hand)
  const scripted = hha.script(analyzed)
  const sb = hha.storyboard(scripted)
  const seatno = 1
  const betReturned = sb.states[sb.streets.turn + 3]

  spok(t, betReturned,
    { $topic: 'bet returned'
    , board: [ '4c', 'Kd', '7s', '4d' ]
    , boardChanged: false
    , pot: 4100 })

  spok(t, betReturned.action,
    { $topic: 'bet returned action'
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
    , playerIndex: 0
    , seatno: 1 })

  spok(t, betReturned.seats[seatno],
    { $topic: 'bet returned seat'
    , chips: 325
    , name: 'GuiTrettel'
    , m: 11
    , sb: true
    , action: 'bet-returned'
    , amount: 325
    , bet: 1
    , investedBet: 1
    , holecards: { card1: 'Ad', card2: 'Qc' }
    , playerIdx: 0
    , seatno: 1
    , folded: false })

  t.end()
})
