import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
// import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";
import fs from "fs";
import posthtml from "posthtml";
import { hash } from "posthtml-hash";
import htmlnano from "htmlnano";
import rimraf from "rimraf";

const PROD = !process.env.ROLLUP_WATCH;

function hashStaticAssets() {
  return {
    name: "hash-static-assets",
    buildStart() {
      rimraf.sync("build");
    },
    writeBundle() {
      posthtml([
        // Hashes `bundle.[hash].css` and `bundle.[hash].js`
        hash({ path: "build" }),

        // Minifies `build/index.html`
        // Documentation: https://github.com/posthtml/htmlnano
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
    sourcemap: !PROD,
    format: "iife",
    name: "app",
    file: "build/bundle.[hash].js",
  },
  plugins: [
    copy({ targets: [{ src: "public/*", dest: "build" }] }),
    svelte({
      dev: !PROD,
      css: (css) => {
        // Emits CSS to file, disables CSS sourcemaps in production
        css.write("build/bundle.[hash].css", !PROD);
      },
    }),
    resolve(),
    !PROD &&
      serve({
        contentBase: ["build"],
        port: 3000,
      }),

    // pending https://github.com/thgh/rollup-plugin-livereload/issues/51
    // !PROD && livereload({ watch: "build" }),
    PROD && terser(),
    PROD && hashStaticAssets(),
  ],
};
