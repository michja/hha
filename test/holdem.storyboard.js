'use strict'

const test = require('tape')
const spok = require('spok')
const hha = require('../')

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

function name(topic, arr) {
  arr.$topic = topic
  return arr
}

test('\nstoryboard of action on all', function(t) {
  const hand = require('./fixtures/holdem/actiononall.json')
  const analyzed = hha(hand)
  const scripted = hha.script(analyzed)
  const sb = hha.storyboard(scripted)

  // mainly smoke tests
  // add more if needed and make sure to carefully modify once code changes
  let res = sb.streets
  spok(t, res,
    { $topic: 'street indexes', preflop: 0, flop: 5, turn: 8, river: 12, showdown: 16 }
  )

  // preflop
  res = sb.states[sb.streets.preflop]
  spok(t, res,
    { $topic: 'preflop stage+0'
    , board: []
    , boardChanged: true
    , pot: 1400
    , action: false
    , stage: 'preflop' })

  // first preflop action
  res = sb.states[sb.streets.preflop + 1]
  spok(t, res,
    { $topic: 'preflop+1'
    , board: []
    , boardChanged: false
    , pot: 3000
    , stage: 'preflop+1' })

  res = sb.states[sb.streets.preflop + 1].action
  spok(t, res,
    { $topic: 'preflop+1 action'
    , action:
      { type: 'raise'
      , ratio: 2
      , allin: false
      , amount: 1600
      , chipsInFront: 1600
      , pot: 1400
      , potAfter: 3000
      , chips: 15825
      , chipsAfter: 14225
      , bet: 2 }
    , playerIndex: 2
    , seatno: 1 })

  res = sb.states[sb.streets.preflop + 1].seats.filter(x => !!x)
  spok(t, res,
    name('preflop+1 seats', [ { chips: 14225
     , name: 'Fischersito'
     , m: 11
     , action: 'raise'
     , amount: 1600
     , chipsInFront: 1600
     , bet: 2
     , holecards: { card1: 'Td', card2: 'Tc' }
     , playerIdx: 2
     , seatno: 1
     , _lastUpdate: 'preflop+1' }
    , { chips: 14064
     , name: 'Irisha2'
     , m: 10
     , action: null
     , amount: 0
     , bet: 0
     , chipsInFront: 0
     , holecards: { card1: 'Qs', card2: 'Jh' }
     , playerIdx: 3
     , seatno: 3
     , _lastUpdate: 'preflop' }
    , { chips: 15001
     , name: 'DmelloH'
     , m: 11
     , action: null
     , amount: 0
     , chipsInFront: 400
     , bet: 0
     , holecards: { card1: '??', card2: '??' }
     , playerIdx: 0
     , seatno: 4
     , _lastUpdate: 'preflop' }
    , { chips: 21210
     , name: 'held'
     , m: 16
     , action: null
     , amount: 0
     , chipsInFront: 800
     , bet: 0
     , holecards: { card1: '4c', card2: '2d' }
     , playerIdx: 1
     , seatno: 9
     , _lastUpdate: 'preflop' } ]))

  // second preflop action
  res = sb.states[sb.streets.preflop + 2].seats.filter(x => !!x)
  spok(t, res,
    name('preflop+2 seats', [ { chips: 14225
     , name: 'Fischersito'
     , m: 11
     , action: 'raise'
     , amount: 1600
     , chipsInFront: 1600
     , bet: 2
     , holecards: { card1: 'Td', card2: 'Tc' }
     , playerIdx: 2
     , seatno: 1
     , _lastUpdate: 'preflop+1' }
    , { chips: 12464
     , name: 'Irisha2'
     , m: 10
     , action: 'call'
     , amount: 1600
     , chipsInFront: 1600
     , bet: 2
     , holecards: { card1: 'Qs', card2: 'Jh' }
     , playerIdx: 3
     , seatno: 3
     , _lastUpdate: 'preflop+2' }
    , { chips: 15001
     , name: 'DmelloH'
     , m: 11
     , action: null
     , amount: 0
     , chipsInFront: 400
     , bet: 0
     , holecards: { card1: '??', card2: '??' }
     , playerIdx: 0
     , seatno: 4
     , _lastUpdate: 'preflop' }
    , { chips: 21210
     , name: 'held'
     , m: 16
     , action: null
     , amount: 0
     , chipsInFront: 800
     , bet: 0
     , holecards: { card1: '4c', card2: '2d' }
     , playerIdx: 1
     , seatno: 9
     , _lastUpdate: 'preflop' } ]))

  // flop
  res = sb.states[sb.streets.flop]
  spok(t, res,
    { $topic: 'flop state'
    , board: [ '3c', 'Jc', '3h' ]
    , boardChanged: true
    , pot: 4600
    , action: false
    , stage: 'flop' })

  // first flop action
  res = sb.states[sb.streets.flop + 1].seats.filter(x => !!x)
  spok(t, res,
    name('flop+1', [ { chips: 11825
     , name: 'Fischersito'
     , m: 11
     , action: 'bet'
     , amount: 2400
     , chipsInFront: 2400
     , bet: 1
     , holecards: { card1: 'Td', card2: 'Tc' }
     , playerIdx: 2
     , seatno: 1
     , _lastUpdate: 'flop+1' }
    , { chips: 12464
     , name: 'Irisha2'
     , m: 10
     , action: null
     , amount: 0
     , chipsInFront: 0
     , bet: 0
     , holecards: { card1: 'Qs', card2: 'Jh' }
     , playerIdx: 3
     , seatno: 3
     , _lastUpdate: 'flop' }
    , { chips: 15001
     , name: 'DmelloH'
     , m: 11
     , action: null
     , amount: 0
     , chipsInFront: 0
     , bet: 0
     , holecards: null
     , playerIdx: 0
     , seatno: 4
     , _lastUpdate: 'flop' }
    , { chips: 21210
     , name: 'held'
     , m: 16
     , action: null
     , amount: 0
     , chipsInFront: 0
     , bet: 0
     , holecards: null
     , playerIdx: 1
     , seatno: 9
     , _lastUpdate: 'flop' } ]))

  // second flop action
  res = sb.states[sb.streets.flop + 2].seats.filter(x => !!x)
  spok(t, res,
    name('flop+2 seats', [ { chips: 11825
     , name: 'Fischersito'
     , m: 11
     , action: 'bet'
     , amount: 2400
     , chipsInFront: 2400
     , bet: 1
     , holecards: { card1: 'Td', card2: 'Tc' }
     , playerIdx: 2
     , seatno: 1
     , _lastUpdate: 'flop+1' }
    , { chips: 10064
     , name: 'Irisha2'
     , m: 10
     , action: 'call'
     , amount: 2400
     , chipsInFront: 2400
     , bet: 1
     , holecards: { card1: 'Qs', card2: 'Jh' }
     , playerIdx: 3
     , seatno: 3
     , _lastUpdate: 'flop+2' }
    , { chips: 15001
     , name: 'DmelloH'
     , m: 11
     , action: null
     , amount: 0
     , chipsInFront: 0
     , bet: 0
     , holecards: null
     , playerIdx: 0
     , seatno: 4
     , _lastUpdate: 'flop' }
    , { chips: 21210
     , name: 'held'
     , m: 16
     , action: null
     , amount: 0
     , chipsInFront: 0
     , bet: 0
     , holecards: null
     , playerIdx: 1
     , seatno: 9
     , _lastUpdate: 'flop' } ]))

  // third flop action
  res = sb.states[sb.streets.flop + 3].seats.filter(x => !!x)
  spok(t, res,
    name('flop+3', [ { chips: 11825
     , name: 'Fischersito'
     , m: 11
     , action: null
     , amount: 0
     , bet: 0
     , investedBet: 0
     , holecards: { card1: 'Td', card2: 'Tc' }
     , playerIdx: 2
     , seatno: 1
     , chipsInFront: 0
     , _lastUpdate: 'turn'
     , folded: false }
    , { chips: 10064
     , name: 'Irisha2'
     , m: 10
     , action: null
     , amount: 0
     , bet: 0
     , investedBet: 0
     , holecards: { card1: 'Qs', card2: 'Jh' }
     , playerIdx: 3
     , seatno: 3
     , chipsInFront: 0
     , _lastUpdate: 'turn'
     , folded: false }
    , { chips: 15001
     , name: 'DmelloH'
     , m: 11
     , sb: true
     , action: null
     , amount: 0
     , bet: 0
     , investedBet: 0
     , holecards: null
     , playerIdx: 0
     , seatno: 4
     , chipsInFront: 0
     , _lastUpdate: 'turn'
     , folded: true }
    , { chips: 21210
     , name: 'held'
     , m: 16
     , bb: true
     , action: null
     , amount: 0
     , bet: 0
     , investedBet: 0
     , holecards: null
     , playerIdx: 1
     , seatno: 9
     , chipsInFront: 0
     , _lastUpdate: 'turn'
     , folded: true } ]))
  t.end()
})
