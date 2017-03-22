'use strict'

const test = require('tape')
const spok = require('spok')
const analyze = require('../')
const script = analyze.script

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')

test('\nscript action on all streets', function(t) {
  const hand = require('./fixtures/holdem/actiononall.json')
  const analyzed = analyze(hand)
  const res = script(analyzed)

  spok(t, res,
    { info:
      { room: 'pokerstars'
      , handid: '149651992548'
      , gametype: 'tournament'
      , gameno: '1495192630'
      , currency: '$'
      , donation: 0.91
      , rake: 0.09
      , buyin: 1
      , pokertype: 'holdem'
      , limit: 'nolimit'
      , level: 'xi '
      , sb: 400
      , bb: 800
      , year: 2016
      , month: 3
      , day: 1
      , hour: 1
      , min: 29
      , sec: 41
      , timezone: 'ET'
      , ante: 50
      , players: 4
      , anyInvested: true
      , anySawFlop: true }
    , table: { tableno: 3, maxseats: 9, button: 3 }
    , board: { card1: '3c', card2: 'Jc', card3: '3h', card4: '6h', card5: '3d' }
    , pots:
      { preflop: 1400
      , flop: 4600
      , turn: 9400
      , river: 12600
      , showdown: 19000 }
    , players:
      [ { seatno: 4
        , chips: 15451
        , chipsPreflop: 15001
        , chipsFlop: 15001
        , chipsTurn: 15001
        , chipsRiver: 15001
        , chipsShowdown: 15001
        , chipsAfter: 15001
        , chipsInFront: 400
        , m: 11
        , sb: true
        , preflopOrder: 2
        , postflopOrder: 0
        , pos: 'sb'
        , exactPos: 'sb'
        , name: 'DmelloH'
        , invested: true
        , sawFlop: false
        , sawShowdown: false }
      , { seatno: 9
        , chips: 22060
        , chipsPreflop: 21210
        , chipsFlop: 21210
        , chipsTurn: 21210
        , chipsRiver: 21210
        , chipsShowdown: 21210
        , chipsAfter: 21210
        , chipsInFront: 800
        , m: 16
        , hero: true
        , cards: { card1: '4c', card2: '2d' }
        , bb: true
        , preflopOrder: 3
        , postflopOrder: 1
        , pos: 'bb'
        , exactPos: 'bb'
        , name: 'held'
        , invested: true
        , sawFlop: false
        , sawShowdown: false }
      , { seatno: 1
        , chips: 15875
        , chipsPreflop: 15825
        , chipsFlop: 14225
        , chipsTurn: 11825
        , chipsRiver: 10225
        , chipsShowdown: 7025
        , chipsAfter: 7025
        , m: 11
        , preflopOrder: 0
        , postflopOrder: 2
        , pos: 'co'
        , exactPos: 'co'
        , cards: { card1: 'Td', card2: 'Tc' }
        , name: 'Fischersito'
        , invested: true
        , sawFlop: true
        , sawShowdown: true }
      , { seatno: 3
        , chips: 14114
        , chipsPreflop: 14064
        , chipsFlop: 12464
        , chipsTurn: 10064
        , chipsRiver: 8464
        , chipsShowdown: 5264
        , chipsAfter: 24264
        , m: 10
        , button: true
        , preflopOrder: 1
        , postflopOrder: 3
        , pos: 'bu'
        , exactPos: 'bu'
        , cards: { card1: 'Qs', card2: 'Jh' }
        , name: 'Irisha2'
        , invested: true
        , sawFlop: true
        , sawShowdown: true } ]
    , actions:
      { preflop:
         [ { action:
              { type: 'raise'
              , ratio: 2
              , allin: false
              , amount: 1600
              , pot: 1400
              , potAfter: 3000
              , chips: 15825
              , chipsAfter: 14225
              , bet: 2
              , chipsInFront: 1600 }
           , playerIndex: 2 }
         , { action:
              { type: 'call'
              , ratio: 0.5
              , allin: false
              , amount: 1600
              , pot: 3000
              , potAfter: 4600
              , chips: 14064
              , chipsAfter: 12464
              , bet: 2
              , chipsInFront: 1600 }
           , playerIndex: 3 }
         , { action:
              { type: 'fold'
              , pot: 4600
              , potAfter: 4600
              , chips: 15001
              , chipsAfter: 15001
              , bet: 2
              , chipsInFront: 400 }
           , playerIndex: 0 }
         , { action:
              { type: 'fold'
              , pot: 4600
              , potAfter: 4600
              , chips: 21210
              , chipsAfter: 21210
              , bet: 2
              , chipsInFront: 800 }
           , playerIndex: 1 } ]
      , flop:
         [ { action:
              { type: 'bet'
              , ratio: 0.5
              , allin: false
              , amount: 2400
              , pot: 4600
              , potAfter: 7000
              , chips: 14225
              , chipsAfter: 11825
              , bet: 1
              , chipsInFront: 2400 }
           , playerIndex: 2 }
         , { action:
              { type: 'call'
              , ratio: 0.3
              , allin: false
              , amount: 2400
              , pot: 7000
              , potAfter: 9400
              , chips: 12464
              , chipsAfter: 10064
              , bet: 1
              , chipsInFront: 2400 }
           , playerIndex: 3 } ]
      , turn:
         [ { action:
              { type: 'check'
              , pot: 9400
              , potAfter: 9400
              , chips: 11825
              , chipsAfter: 11825
              , bet: 1
              , chipsInFront: 0 }
           , playerIndex: 2 }
         , { action:
              { type: 'bet'
              , ratio: 0.2
              , allin: false
              , amount: 1600
              , pot: 9400
              , potAfter: 11000
              , chips: 10064
              , chipsAfter: 8464
              , bet: 1
              , chipsInFront: 1600 }
           , playerIndex: 3 }
         , { action:
              { type: 'call'
              , ratio: 0.1
              , allin: false
              , amount: 1600
              , pot: 11000
              , potAfter: 12600
              , chips: 11825
              , chipsAfter: 10225
              , bet: 1
              , chipsInFront: 1600 }
           , playerIndex: 2 } ]
      , river:
         [ { action:
              { type: 'check'
              , pot: 12600
              , potAfter: 12600
              , chips: 10225
              , chipsAfter: 10225
              , bet: 1
              , chipsInFront: 0 }
           , playerIndex: 2 }
         , { action:
              { type: 'bet'
              , ratio: 0.3
              , allin: false
              , amount: 3200
              , pot: 12600
              , potAfter: 15800
              , chips: 8464
              , chipsAfter: 5264
              , bet: 1
              , chipsInFront: 3200 }
           , playerIndex: 3 }
         , { action:
              { type: 'call'
              , ratio: 0.2
              , allin: false
              , amount: 3200
              , pot: 15800
              , potAfter: 19000
              , chips: 10225
              , chipsAfter: 7025
              , bet: 1
              , chipsInFront: 3200 }
           , playerIndex: 2 } ]
      , showdown:
         [ { action:
              { type: 'collect'
              , ratio: 1
              , winall: true
              , amount: 19000
              , chips: 5264
              , chipsAfter: 24264
              , chipsInFront: 19000 }
           , playerIndex: 3 } ] } })
  t.end()
})
