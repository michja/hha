/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

const analyzeHoldem = require('./lib/holdem')

module.exports = function analyze (hand) {
  if (!hand.info) throw new Error('Hand is missing info')
  if (hand.info.pokertype === 'holdem') return analyzeHoldem(hand)
}

// Test
function inspect (obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
if (!module.parent && typeof window === 'undefined') {
  const fs = require('fs')
  const path = require('path')
  const hhv_fixtures = path.join(__dirname, '..', 'hhv', 'test', 'fixtures', 'holdem')

  // const name = 'actiononall'
  const name = 'allin-preflop'

  const hand = require('./test/fixtures/holdem/' + name + '.json')
  const analyzed = module.exports(hand)

  inspect(analyzed)

  fs.writeFileSync(path.join(hhv_fixtures, name + '.json'),
                   JSON.stringify(analyzed, null, 2),
                   'utf8')
}
