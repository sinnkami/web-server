const gulp = require("gulp");
const uglify = require("gulp-uglify");
const args = require("./lib/value");
const gutil = require("gulp-util");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");

gulp.task("scripts", function() {
	return gulp
		.src([`${args.src}/public/scripts/**/*.js`, `!${args.src}/public/scripts/**/*.min.js`])
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest(`${args.dest}/public/scripts/`));
});

gulp.task("scripts:min", function() {
	return gulp.src(`!${args.src}/public/scripts/**/*.min.js`).pipe(gulp.dest(`${args.dest}/public/scripts/`));
});
