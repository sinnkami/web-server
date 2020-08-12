const gulp = require("gulp");
const args = require("./lib/value");

const compile = require("./lib/typescriptCompile");

gulp.task("config:normal", () => compile([`${args.src}/config/**/*.ts`], `${args.dest}/config/`));

gulp.task("config", gulp.parallel("config:normal"));
