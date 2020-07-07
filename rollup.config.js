import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";
import fs from "fs";
import posthtml from "posthtml";
import { hash } from "posthtml-hash";
import htmlnano from "htmlnano";
import rimraf from "rimraf";

const IS_PROD = !process.env.ROLLUP_WATCH;

function hashStaticAssets() {
  return {
    name: "hash-static-assets",
    buildStart() {
      // Cleans the `build` folder
      rimraf.sync("build");
    },
    writeBundle() {
      posthtml([
        // Hashes `bundle.[hash].css` and `bundle.[hash].js`
        hash({ path: "build" }),

        // Minifies `build/index.html`
        // For documentation on custom options, see https://github.com/posthtml/htmlnano
        htmlnano(),
      ])
        .process(fs.readFileSync("build/index.html"))
        .then((result) => fs.writeFileSync("build/index.html", result.html));
    },
  };
}

export default {
  input: "src/index.js",
  output: {
    sourcemap: !IS_PROD,
    format: "iife",
    name: "app",
    file: "build/bundle.[hash].js",
  },
  plugins: [
    copy({ targets: [{ src: "public/*", dest: "build" }] }),
    svelte({
      dev: !IS_PROD,
      css: (css) => {
        // Emits CSS to file, disables CSS sourcemaps in production
        css.write("build/bundle.[hash].css", !IS_PROD);
      },
    }),
    resolve(),
    commonjs(),
    !IS_PROD &&
      serve({
        contentBase: ["build"],
        port: 3000,
      }),
    !IS_PROD && livereload({ watch: "build" }),
    IS_PROD && terser(),
    IS_PROD && hashStaticAssets(),
  ],
};
