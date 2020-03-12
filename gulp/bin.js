const gulp = require("gulp");
const args = require("./lib/value");

const ts = require("gulp-typescript");
const rename = require("gulp-rename");

gulp.task("bin", () => {
	return gulp
		.src(`${args.src}/bin/www.ts`)
		.pipe(ts())
		.pipe(rename("./www"))
		.pipe(gulp.dest(`${args.dest}/bin/`));
});
