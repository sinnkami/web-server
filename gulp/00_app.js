const gulp = require("gulp");
const args = require("./lib/value");

const compile = require("./lib/typescriptCompile");

gulp.task("app:normal", () => compile([`${args.src}/app.ts`], `${args.dest}`));

gulp.task("app", gulp.parallel("app:normal"));
