'use strict'

const test = require('tape')
const analyze = require('../')

const hand = require('./fixtures/holdem/posts-allin.json')
const res = analyze(hand)

test('\nplayer allin after posting is removed', function(t) {
  t.equal(hand.seats[0].player, 'norgas69')
  t.equal(res.players[0].name, 'grmpjb')
  t.end()
})
