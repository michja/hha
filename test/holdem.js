/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

const test = require('tape')
const spok = require('spok')
const analyze = require('../')

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect (obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
/* eslint-ensable no-unused-vars */

test('\naction on all streets', function (t) {
  t.pass('original HH for reference: https://github.com/thlorenz/hhp/blob/7ab748013ff7b2f762497abbd55f04d25d387701/test/fixtures/holdem/pokerstars/actiononall.txt')
  const hand = require('./fixtures/holdem/actiononall.json')
  const res = analyze(hand)

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
    , players: 4 })

  spok(t, res.table, { $topic: 'table', tableno: 3, maxseats: 9, button: 3 })
  spok(t, res.board,
    { $topic: 'board', card1: '3c', card2: 'Jc', card3: '3h', card4: '6h', card5: '3d' })

  t.equal(res.players.length, 4, '4 players')
  spok(t, res.players[0],
    { $topic: 'player 0'
    , seatno: 4
    , chips: 15451
    , chipsPreflop: 15001
    , chipsFlop: 15001
    , chipsAfter: 15001
    , m: 11
    , preflop: [ { type: 'fold', pot: 4600 } ]
    , flop: []
    , turn: []
    , river: []
    , sb: true
    , preflopOrder: 2
    , postflopOrder: 0
    , pos: 'sb'
    , name: 'DmelloH'
    , invested: true })

  spok(t, res.players[1],
    { $topic: 'player 1'
    , seatno: 9
    , chips: 22060
    , chipsPreflop: 21210
    , chipsFlop: 21210
    , chipsAfter: 21210
    , m: 16
    , preflop: [ { type: 'fold', pot: 4600 } ]
    , flop: []
    , turn: []
    , river: []
    , hero: true
    , cards: { card1: '4c', card2: '2d' }
    , bb: true
    , preflopOrder: 3
    , postflopOrder: 1
    , pos: 'bb'
    , name: 'held'
    , invested: true })

  spok(t, res.players[2],
    { $topic: 'player 2'
    , seatno: 1
    , chips: 15875
    , chipsPreflop: 15825
    , chipsFlop: 14225
    , chipsTurn: 11825
    , chipsRiver: 10225
    , chipsShowdown: 7025
    , chipsAfter: 7025
    , m: 11
    , preflop: [ { type: 'raise', ratio: 2, allin: false, amount: 1600, pot: 1400 } ]
    , flop: [ { type: 'bet', ratio: 0.5, allin: false, amount: 2400, pot: 4600 } ]
    , turn:
      [ { type: 'check', pot: 9400 }
      , { type: 'call'
        , ratio: 0.1
        , allin: false
        , amount: 1600
        , pot: 11000 } ]
    , river:
      [ { type: 'check', pot: 12600 }
      , { type: 'call'
        , ratio: 0.2
        , allin: false
        , amount: 3200
        , pot: 15800 } ]
    , preflopOrder: 0
    , postflopOrder: 2
    , pos: 'co'
    , cards: { card1: 'Td', card2: 'Tc' }
    , name: 'Fischersito'
    , invested: true })

  spok(t, res.players[3],
    { $topic: 'player 3'
    , seatno: 3
    , chips: 14114
    , chipsPreflop: 14064
    , chipsFlop: 12464
    , chipsTurn: 10064
    , chipsRiver: 8464
    , chipsShowdown: 5264
    , chipsAfter: 24264
    , m: 10
    , preflop: [ { type: 'call', ratio: 0.5, allin: false, amount: 1600, pot: 3000 } ]
    , flop: [ { type: 'call', ratio: 0.3, allin: false, amount: 2400, pot: 7000 } ]
    , turn: [ { type: 'bet', ratio: 0.2, allin: false, amount: 1600, pot: 9400 } ]
    , river: [ { type: 'bet', ratio: 0.3, allin: false, amount: 3200, pot: 12600 } ]
    , button: true
    , preflopOrder: 1
    , postflopOrder: 3
    , pos: 'bu'
    , cards: { card1: 'Jh', card2: 'Qs' }
    , collect: 1
    , winall: true
    , name: 'Irisha2'
    , invested: true })

  t.end()
})

test('\npreflop allin', function (t) {
  t.pass('original HH for reference: https://github.com/thlorenz/hhp/blob/7ab748013ff7b2f762497abbd55f04d25d387701/test/fixtures/holdem/pokerstars/allin-preflop.txt')
  const hand = require('./fixtures/holdem/allin-preflop.json')
  const res = analyze(hand)

  spok(t, res.info,
    { $topic: 'info'
    , room: 'pokerstars'
    , handid: '149652059422'
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
    , min: 33
    , sec: 54
    , timezone: 'ET'
    , ante: 50
    , players: 4 })

  spok(t, res.table,
    { $topic: 'table', tableno: 3, maxseats: 9, button: 3 })
  spok(t, res.board,
    { $topic: 'board', card1: '8h', card2: 'Kd', card3: '2s', card4: '6s', card5: '4s' })

  t.equal(res.players.length, 4, '4 players')
//  ocat.file(res.players[0], { depth: 5 })
  // inspect(res.players[0])
  t.end()
})
