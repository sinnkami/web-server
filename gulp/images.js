const gulp = require("gulp");
const args = require("./lib/value");

const imagemin = require("gulp-imagemin");
const gulpif = require("gulp-if");

gulp.task("images", function() {
	return gulp
		.src(`${args.src}/public/images/**/*`)
		.pipe(gulpif(args.compression, imagemin()))
		.pipe(gulp.dest(`${args.dest}/public/images`));
});
