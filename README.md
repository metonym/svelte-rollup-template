# svelte-rollup-template

> Svelte Rollup template with static asset hashing and minification.

This template extends the official [Svelte rollup template](https://github.com/sveltejs/template) by focusing on the post-build process. The initial motivation was to address [an issue](https://github.com/sveltejs/template/issues/39) about hashing file names.

In addition to separating the `public/` and `build/` folders, this project uses [PostHTML](https://github.com/posthtml/posthtml) to post-process compiled assets.

The CSS/JS files are hashed for caching (and invalidating the cache when changes are built) in production while the HTML markup is minified.

## Getting Started

Clone the repository and install its dependencies.

```bash
git@github.com:metonym/svelte-rollup-template.git
cd svelte-rollup-template
yarn install
```

## Available Scripts

### `yarn develop`

Runs the app in development mode with livereload enabled. Visit `http://localhost:3000` to view the app.

To configure the port number, modify the `port` value in [rollup.config.js](rollup.config.js#L45).

```diff
serve({
  contentBase: ['build'],
- port: 3000
+ port: 8080
})
```

### `yarn build`

Builds the app in production mode.

First, the `build/` folder is removed. Next, Rollup is run in production. Similar to development mode, the `public/` folder is first copied into `build/` before Rollup outputs the minified `bundle.css` and `bundle.js`.

Lastly, the [postbuild.js](postbuild.js) script is run, executing [PostHTML](https://github.com/posthtml/posthtml) plugins on the static assets in `build/`.

The first plugin ([posthtml-hash](https://github.com/posthtml/posthtml-hash)) hashes `bundle.css` and `bundle.js`. The second plugin ([htmlnano](https://github.com/posthtml/htmlnano)) minifies `build/index.html`.

#### Hashing Static Assets

```html
<!-- Result of `posthtml-hash` -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Svelte Rollup Template</title>
    <link rel="stylesheet" href="bundle.b19ea05c629cee24e7b1.css">
  </head>
  <body>
    <script src="bundle.d84688974c6150c07e5f.js"></script>
  </body>
</html>
```

#### Minifying `build/index.html`

```html
<!-- Result of `htmlnano` -->
<!DOCTYPE html><html><head><meta charset="utf-8"><title>Svelte Rollup Template</title><link rel="stylesheet" href="bundle.b19ea05c629cee24e7b1.css"></head><body> <script src="bundle.d84688974c6150c07e5f.js"></script> </body></html>
```

## License

[MIT](LICENSE)
