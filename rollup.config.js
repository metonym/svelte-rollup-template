import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import fs from "fs";
import posthtml from "posthtml";
import { hash } from "posthtml-hash";
import rimraf from "rimraf";

const PROD = !process.env.ROLLUP_WATCH;
const OUT_DIR = "build";
const OUT_FILE = `${OUT_DIR}/index.html`;

const hashStatic = () => ({
  name: "hash-static",
  buildStart: () => rimraf.sync(OUT_DIR),
  writeBundle: () => {
    posthtml([hash({ path: OUT_DIR })])
      .process(fs.readFileSync(OUT_FILE, "utf-8"))
      .then((result) => fs.writeFileSync(OUT_FILE, result.html));
  },
});

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
      compilerOptions: {
        dev: !PROD,
      },
    }),
    css({ output: "bundle.[hash].css" }),
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
