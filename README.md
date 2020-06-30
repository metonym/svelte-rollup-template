# svelte-rollup-template

> Svelte Rollup template with static asset hashing and minification.

This template augments the official [Svelte rollup template](https://github.com/sveltejs/template) by hashing static assets (CSS/JS) for production.

This provides a solution regarding **[a GitHub issue about hashing file names](https://github.com/sveltejs/template/issues/39)**.

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

## Key Features

When building for production...

- CSS/JS files are hashed
- HTML is minified

This project uses [PostHTML](https://github.com/posthtml/posthtml) to process compiled assets after the build stage.

## Getting Started

Quickly scaffold a new project using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit github:metonym/svelte-rollup-template my-app
cd my-app
yarn
```

## Available Scripts

### `yarn develop`

Runs the app in development mode with livereload enabled. Visit [http://localhost:3000](http://localhost:3000) to view the app.

The port number can be customized in [rollup.config.js](rollup.config.js#L45).

```diff
serve({
  contentBase: ['build'],
- port: 3000
+ port: 8080
})
```

### `yarn build`

Builds the app for production.

After the app is compiled to the `build` folder, the [`postbuild` script](postbuild.js) script runs [PostHTML](https://github.com/posthtml/posthtml) on the static assets.

#### Asset Hashing

[posthtml-hash](https://github.com/posthtml/posthtml-hash) hashes `bundle.css` and `bundle.js`.

#### Minification

[htmlnano](https://github.com/posthtml/htmlnano) minifies `build/index.html`.

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><title>Svelte Rollup Template</title><link rel="stylesheet" href="bundle.5ccf24860b75522d3daf.css"></head><body> <script src="bundle.7d7b7b53409b383e630b.js"></script> </body></html>
```

## License

[MIT](LICENSE)
