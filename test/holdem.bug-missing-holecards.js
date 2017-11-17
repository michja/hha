'use strict'

const test = require('tape')
const spok = require('spok')
const analyze = require('../')

const hand = require('./fixtures/holdem/bug-missing-holecards.json')
const res = analyze(hand)

test('\nwhen hero shows or mucks we do no longer screw with known holecards', function(t) {
  spok(t, res.players[3].cards, { card1: '9c', card2: '9s' })
  t.end()
})
