const gulp = require("gulp");
const args = require("./lib/value");

const ts = require("gulp-typescript");

gulp.task("routes", function() {
	return gulp
		.src(`${args.src}/routes/**/*.ts`)
		.pipe(ts())
		.pipe(gulp.dest(`${args.dest}/routes`));
});
