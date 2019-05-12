/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

const analyzeHoldem = require('./lib/holdem')

/**
 * Analyzes a given PokerHand which has been parsed by the HandHistory Parser hhp.
 * Relative player positions are calculated, i.e. cutoff, button, etc.
 * Players are included in order of action on flop.
 *
 * The analyzed hand then can be visualized by [hhv](https://github.com/thlorenz/hhv).
 *
 * For an example of an analyzed hand please view [json output of an analyzed
 * hand](https://github.com/thlorenz/hhv/blob/master/test/fixtures/holdem/actiononall.json).
 *
 * @name analyze
 * @function
 * @param {object} hand hand history as parsed by [hhp](https://github.com/thlorenz/hhp)
 * @return {object} the analyzed hand
 */
exports = module.exports = function analyze(hand) {
  if (!hand.info) throw new Error('Hand is missing info')
  if (hand.info.pokertype === 'holdem' || hand.info.pokertype === "omaha") return analyzeHoldem(hand)
}

exports.script     = require('./lib/script')
exports.storyboard = require('./lib/storyboard')
exports.summary     = require('./lib/summary')

exports.strategicPositions = require('./lib/strategic-positions').list

function wasActive(x) {
  return x.preflop[0] && x.preflop[0].type !== 'fold'
}

/**
 * Filters all players who didn't act in the hand or just folded.
 *
 * @name filterInactives
 * @function
 * @param {Array.<Object>} players all players in the hand
 * @return {Array.<Object>} all players that were active in the hand
 */
exports.filterInactives = function filterInactives(players) {
  if (players == null) return []
  return players.filter(wasActive)
}

