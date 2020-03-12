const gulp = require("gulp");
const args = require("./lib/value");

const ts = require("gulp-typescript");

gulp.task("express", function() {
	return gulp
		.src(`${args.src}/app.ts`)
		.pipe(ts())
		.pipe(gulp.dest(`${args.dest}/`));
});
