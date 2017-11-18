'use strict'

const test = require('tape')
const spok = require('spok')
const analyze = require('../')

const hand = require('./fixtures/holdem/mucks-hand.json')
const res = analyze(hand)

test('\nensure we capture mucked cards mentioned only in summary correctly', function(t) {
  spok(t, res.players[1].cards,
    { card1: '7h', card2: '9c' })
  t.end()
})
