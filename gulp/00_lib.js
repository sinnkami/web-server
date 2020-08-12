const gulp = require("gulp");
const args = require("./lib/value");

const compile = require("./lib/typescriptCompile");

gulp.task("lib:normal", () => compile([`${args.src}/lib/**/*.ts`, `!${args.src}/lib/**/*.min.*`], `${args.dest}/lib/`));
gulp.task("lib:min", function () {
	return gulp.src([`!${args.src}/lib/**/*.ts`, `${args.src}/lib/**/*.min.*`]).pipe(gulp.dest(`${args.dest}/lib/`));
});

gulp.task("lib", gulp.parallel("lib:normal", "lib:min"));
