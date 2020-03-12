const gulp = require("gulp");
const args = require("./lib/value");

const ts = require("gulp-typescript");

gulp.task("config", function() {
	return gulp
		.src(`${args.src}/config/**/*`)
		.pipe(ts())
		.pipe(gulp.dest(`${args.dest}/config`));
});
