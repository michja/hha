# hha [![build status](https://secure.travis-ci.org/thlorenz/hha.png)](http://travis-ci.org/thlorenz/hha)

Poker HandHistory Analyzer

## Status

Analyzes holdem hands.

## Installation

    npm install hha

## API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="analyze"><span class="type-signature"></span>analyze<span class="signature">(hand)</span><span class="type-signature"> &rarr; {object}</span></h4>
</dt>
<dd>
<div class="description">
<p>Analyzes a given PokerHand which has been parsed by the HandHistory Parser hhp.
Relative player positions are calculated, i.e. cutoff, button, etc.
Players are included in order of action on flop.</p>
<p>The analyzed hand then can be visualized by <a href="https://github.com/thlorenz/hhv">hhv</a>.</p>
<p>For an example of an analyzed hand please view <a href="https://github.com/thlorenz/hhv/blob/master/test/fixtures/holdem/actiononall.json">json output of an analyzed
hand</a>.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>hand</code></td>
<td class="type">
<span class="param-type">object</span>
</td>
<td class="description last"><p>hand history as parsed by <a href="https://github.com/thlorenz/hhp">hhp</a></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/hha/blob/master/hha.js">hha.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/hha/blob/master/hha.js#L6">lineno 6</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the analyzed hand</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">object</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
