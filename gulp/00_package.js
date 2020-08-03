const gulp = require("gulp");
const args = require("./lib/value");

const install = require("gulp-install");

gulp.task("package", function() {
	return gulp
		.src(`${args.src}/package.json`)
		.pipe(gulp.dest(`${args.dest}/`))
		.pipe(install());
});
