const gulp = require("gulp");
const args = require("./lib/value");

const imagemin = require("gulp-imagemin");
const gulpif = require("gulp-if");

gulp.task("favicon", function () {
	return gulp
		.src(`${args.src}/public/favicon.ico`, { allowEmpty: true })
		.pipe(gulpif(args.compression, imagemin()))
		.pipe(gulp.dest(`${args.dest}/public/`));
});
