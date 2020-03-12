const gulp = require("gulp");
const args = require("./lib/value");

const ts = require("gulp-typescript");

gulp.task("lib", function() {
	return gulp
		.src([`${args.src}/lib/**/*.ts`, `!${args.src}/lib**/*.min.*`])
		.pipe(ts())
		.pipe(gulp.dest(`${args.dest}/lib/`));
});

gulp.task("lib:min", function() {
	return gulp.src(`${args.src}/lib/**/*.min.*`).pipe(gulp.dest(`${args.dest}/lib/`));
});
