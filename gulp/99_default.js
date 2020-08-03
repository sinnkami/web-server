const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("default", gulp.series("build"));
