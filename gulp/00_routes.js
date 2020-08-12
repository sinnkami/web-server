const gulp = require("gulp");
const args = require("./lib/value");

const compile = require("./lib/typescriptCompile");

gulp.task("routes:normal", () => compile([`${args.src}/routes/**/*.ts`], `${args.dest}/routes/`));

gulp.task("routes", gulp.parallel("routes:normal"));
