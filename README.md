# svelte-rollup-template

> Svelte Rollup template with file name hashing and HTML minification.

This template supplements the official [Svelte Rollup template](https://github.com/sveltejs/template) by hashing CSS/JS file names when building for production. In addition, the template HTML is minified.

This set-up is a solution for a [GitHub issue about hashing file names](https://github.com/sveltejs/template/issues/39). See [rollup.config.js](rollup.config.js) for how this is done.

```diff
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Svelte Rollup Template</title>
-   <link rel="stylesheet" href="bundle.[hash].css">
+   <link rel="stylesheet" href="bundle.5ccf24860b75522d3daf.css">
  </head>
  <body>
-   <script src="bundle.[hash].js"></script>
+   <script src="bundle.6c40f5d525738d004a3c.js"></script>
  </body>
</html>
```

## Key Differences

When building for production:

- CSS/JS file names are hashed
- HTML is minified

This project uses [PostHTML](https://github.com/posthtml/posthtml) to process compiled assets after the build stage.

## Quick Start

Scaffold a new project using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit metonym/svelte-rollup-template svelte-app
cd svelte-app
yarn
```

## Available Scripts

### `yarn dev`

Runs the app in development mode. Visit [http://localhost:3000](http://localhost:3000) to view the app.

Customize the port number in [rollup.config.js](rollup.config.js#L57).

```diff
serve({
  contentBase: ['build'],
- port: 3000
+ port: 8080
})
```

### `yarn build`

Builds the app for production.

[PostHTML](https://github.com/posthtml/posthtml) is executed in a [custom Rollup plugin](rollup.config.js#L16) that taps into the `writeBundle` hook.

#### Asset Hashing

[posthtml-hash](https://github.com/posthtml/posthtml-hash) hashes `bundle.css` and `bundle.js`.

#### Minification

[htmlnano](https://github.com/posthtml/htmlnano) minifies `build/index.html`.

## Customization

### Remove HTML minification

```diff
# rollup.config.js
posthtml([
  // hashes `bundle.[hash].css` and `bundle.[hash].js`
  hash({ path: OUR_DIR }),

  // minifies `build/index.html`
  // https://github.com/posthtml/htmlnano
- htmlnano(),
])
```

## License

[MIT](LICENSE)
