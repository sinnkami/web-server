const gulp = require("gulp");
const args = require("./lib/value");

const compile = require("./lib/typescriptCompile");

gulp.task("bin:normal", () => compile([`${args.src}/bin/www.ts`], `${args.dest}/bin/`));

gulp.task("bin", gulp.parallel("bin:normal"));
