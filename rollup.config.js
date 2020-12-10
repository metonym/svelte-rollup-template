import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";
import fs from "fs";
import posthtml from "posthtml";
import { hash } from "posthtml-hash";
import htmlnano from "htmlnano";
import rimraf from "rimraf";

const PROD = !process.env.ROLLUP_WATCH;
const OUT_DIR = "build";

function hashStatic() {
  return {
    name: "hash-static",
    buildStart() {
      rimraf.sync(OUT_DIR);
    },
    writeBundle() {
      posthtml([
        // hashes `bundle.[hash].css` and `bundle.[hash].js`
        hash({ path: OUT_DIR }),

        // minifies `build/index.html`
        // https://github.com/posthtml/htmlnano
        htmlnano(),
      ])
        .process(fs.readFileSync(`${OUT_DIR}/index.html`))
        .then((result) =>
          fs.writeFileSync(`${OUT_DIR}/index.html`, result.html)
        );
    },
  };
}

export default {
  input: "src/index.js",
  output: {
    sourcemap: !PROD,
    format: "iife",
    name: "app",
    file: `${OUT_DIR}/bundle.[hash].js`,
  },
  plugins: [
    copy({ targets: [{ src: "public/*", dest: OUT_DIR }] }),
    svelte({
      dev: !PROD,
      css: (css) => {
        // Emits CSS to file, disables CSS sourcemaps in production
        css.write("bundle.[hash].css", !PROD);
      },
    }),
    resolve(),
    !PROD &&
      serve({
        contentBase: [OUT_DIR],
        port: 3000,
      }),
    !PROD && livereload({ watch: OUT_DIR }),
    PROD && terser(),
    PROD && hashStatic(),
  ],
};
