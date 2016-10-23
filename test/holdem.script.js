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

  spok(t, res.info,
      { $topic: 'info'
      , room: 'pokerstars'
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
  )

  spok(t, res.board, { $topic: 'board',  card1: '3c', card2: 'Jc', card3: '3h', card4: '6h', card5: '3d' })

  spok(t, res.actions.preflop,
    [ { action:
        { type: 'raise'
        , ratio: 2
        , allin: false
        , amount: 1600
        , pot: 1400
        , potAfter: 3000
        , chips: 15825
        , chipsAfter: 14225 }
     , playerIndex: 2 }
    , { action:
        { type: 'call'
        , ratio: 0.5
        , allin: false
        , amount: 1600
        , pot: 3000
        , potAfter: 4600
        , chips: 14064
        , chipsAfter: 12464 }
     , playerIndex: 3 }
    , { action:
        { type: 'fold'
        , pot: 4600
        , potAfter: 4600
        , chips: 15001
        , chipsAfter: 15001 }
     , playerIndex: 0 }
    , { action:
        { type: 'fold'
        , pot: 4600
        , potAfter: 4600
        , chips: 21210
        , chipsAfter: 21210 }
     , playerIndex: 1 } ])

  spok(t, res.actions.flop,
    [ { action:
        { type: 'bet'
        , ratio: 0.5
        , allin: false
        , amount: 2400
        , pot: 4600
        , potAfter: 7000
        , chips: 14225
        , chipsAfter: 11825 }
     , playerIndex: 2 }
    , { action:
        { type: 'call'
        , ratio: 0.3
        , allin: false
        , amount: 2400
        , pot: 7000
        , potAfter: 9400
        , chips: 12464
        , chipsAfter: 10064 }
     , playerIndex: 3 } ])

  spok(t, res.actions.turn,
    [ { action:
        { type: 'check'
        , pot: 9400
        , potAfter: 9400
        , chips: 11825
        , chipsAfter: 11825 }
     , playerIndex: 2 }
    , { action:
        { type: 'bet'
        , ratio: 0.2
        , allin: false
        , amount: 1600
        , pot: 9400
        , potAfter: 11000
        , chips: 10064
        , chipsAfter: 8464 }
     , playerIndex: 3 }
    , { action:
        { type: 'call'
        , ratio: 0.1
        , allin: false
        , amount: 1600
        , pot: 11000
        , potAfter: 12600
        , chips: 11825
        , chipsAfter: 10225 }
     , playerIndex: 2 } ])

  spok(t, res.actions.river,
    [ { action:
        { type: 'check'
        , pot: 12600
        , potAfter: 12600
        , chips: 10225
        , chipsAfter: 10225 }
     , playerIndex: 2 }
    , { action:
        { type: 'bet'
        , ratio: 0.3
        , allin: false
        , amount: 3200
        , pot: 12600
        , potAfter: 15800
        , chips: 8464
        , chipsAfter: 5264 }
     , playerIndex: 3 }
    , { action:
        { type: 'call'
        , ratio: 0.2
        , allin: false
        , amount: 3200
        , pot: 15800
        , potAfter: 19000
        , chips: 10225
        , chipsAfter: 7025 }
     , playerIndex: 2 } ])

  spok(t, res.actions.showdown,
    [ { action:
        { type: 'collect'
        , ratio: 1
        , winall: true
        , amount: 19000
        , chips: 5264
        , chipsAfter: 24264 }
     , playerIndex: 3 } ])

  t.end()
})
