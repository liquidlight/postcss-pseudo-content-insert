# PostCSS Pseudo Content Insert [![Build Status][ci-img]][ci]

[PostCSS] plugin inserts an empty content block into your :before and :after pseudo elements if it is missing.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mikestreety/postcss-pseudo-content-insert.svg
[ci]:      https://travis-ci.org/mikestreety/postcss-pseudo-content-insert

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-pseudo-content-insert') ])
```

See [PostCSS] docs for examples for your environment.
