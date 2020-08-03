const gulp = require("gulp");
const args = require("./lib/value");

const sass = require("gulp-sass");
const gulpif = require("gulp-if");
const gutil = require("gulp-util");
const cleanCSS = require("gulp-clean-css");

gulp.task("style:sass", function () {
	return gulp
		.src(`${args.src}/public/scss/**/*.scss`)
		.pipe(
			sass().on("error", function (error) {
				gutil.log(gutil.colors.red("Error (" + error.plugin + "): " + error.message));
				this.emit("end");
			})
		)
		.pipe(gulpif(args.compression, cleanCSS()))
		.pipe(gulp.dest(`${args.dest}/public/css/`));
});

gulp.task("style:css", function () {
	return gulp
		.src(`${args.src}/public/css/**/*.css`)
		.pipe(gulpif(args.compression, cleanCSS()))
		.pipe(gulp.dest(`${args.dest}/public/css/`));
});

gulp.task("style:juqey-ui", function () {
	return gulp.src(`${args.src}/public/css/jquery-ui/*.png`).pipe(gulp.dest(`${args.dest}/public/css/images/`));
});

gulp.task("style", gulp.parallel("style:sass", "style:css", "style:juqey-ui"));
