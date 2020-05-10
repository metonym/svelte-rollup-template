const fs = require("fs");
const posthtml = require("posthtml");
const { hash } = require("posthtml-hash");
const htmlnano = require("htmlnano");

posthtml([
  // Hashes `build/bundle.[hash].css` and `build/bundle.[hash].js`
  hash({ path: "build" }),

  // Minifies `build/index.html`
  htmlnano(),
])
  .process(fs.readFileSync("build/index.html"))
  .then((result) => fs.writeFileSync("build/index.html", result.html));
