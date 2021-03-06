# PostCSS Pseudo Content Insert [![Build Status][ci-img]][ci]

[PostCSS] plugin inserts an empty content block into your :before and :after pseudo elements if it is missing.

Shout-out to [omgovich] with his [postcss plugin], for inspiration and guidance.


[postcss plugin]:  	https://github.com/omgovich/postcss-pseudo-elements-content
[omgovich]: 		https://github.com/omgovich
[PostCSS]: 			https://github.com/postcss/postcss
[ci-img]:  			https://travis-ci.org/liquidlight/postcss-pseudo-content-insert.svg
[ci]:      			https://travis-ci.org/liquidlight/postcss-pseudo-content-insert

```css
.foo:after {
	content: '';
	display: block;
}
.foo:before {
	display: inline-block;
}
```

```css
.foo:after {
	content: '';
	display: block;
}
.foo:before {
	display: inline-block;
    content: '';
}
```

## Usage

```js
postcss([ require('postcss-pseudo-content-insert') ])
```

See [PostCSS] docs for examples for your environment.
