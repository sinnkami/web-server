const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("public", gulp.parallel("scripts", "images", "style", "json", "font", "favicon", "textboxio"));
