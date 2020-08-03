const gulp = require("gulp");
const args = require("./lib/value");

const plumber = require("gulp-plumber");

gulp.task("views", function() {
	return gulp
		.src(`${args.src}/views/**/*.pug`)
		.pipe(plumber())
		.pipe(gulp.dest(`${args.dest}/views`));
});
