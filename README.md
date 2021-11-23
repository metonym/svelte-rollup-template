# svelte-rollup-template

> Svelte Rollup template with file name hashing and HTML minification.

This template supplements the official [Svelte Rollup template](https://github.com/sveltejs/template) by hashing CSS/JS file names when building for production.

This set-up is a solution for a [GitHub issue about hashing file names](https://github.com/sveltejs/template/issues/39). See [rollup.config.js](rollup.config.js) for how this is done.

```diff
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Svelte Rollup Template</title>
-   <link rel="stylesheet" href="bundle.[hash].css">
+   <link rel="stylesheet" href="bundle.6c0c7a271e461f676648.css">
  </head>
  <body>
-   <script src="bundle.[hash].js"></script>
+   <script src="bundle.0cbdc0ab51655f1893e1.js"></script>
  </body>
</html>
```

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

Customize the port number in [rollup.config.js](rollup.config.js#L47).

```diff
serve({
  contentBase: [OUT_DIR],
- port: 3000
+ port: 8080
})
```

### `yarn build`

Builds the app for production.

[PostHTML](https://github.com/posthtml/posthtml) is executed in a [custom Rollup plugin](rollup.config.js#L16) that taps into the `writeBundle` hook.

[posthtml-hash](https://github.com/posthtml/posthtml-hash) hashes the filenames of `bundle.css` and `bundle.js`.

## License

[MIT](LICENSE)
