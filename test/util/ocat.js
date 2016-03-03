'use strict'

var ocat = require('ocat')
ocat.opts = {
  prefix: '  spok(t, res., \n',
  suffix: ')',
  indent: '   '
}

module.exports = ocat
