const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("public", ["scripts", "images", "style", "json", "font", "favicon", "textboxio"]);
