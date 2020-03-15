const gulp = require("gulp");
const args = require("./lib/value");

const watch = require("gulp-watch");
const gulp_sequence = require("gulp-sequence");

gulp.task("watch:express", callback => {
	if (!args.watch) {
		return callback();
	}

	gulp_sequence("server").call();

	watch(`${args.src}/package.json`, () => {
		return gulp_sequence("package", "server").call();
	});
	watch(`${args.src}/public/**/*`, () => {
		return gulp_sequence("public").call();
	});
	watch(`${args.src}/**/*.ts`, () => {
		return gulp_sequence("typescript", "server").call();
	});
});
