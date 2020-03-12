const gulp = require("gulp");
const args = require("./lib/value");

const del = require("del");

gulp.task("reset", callback => {
	return del([`${args.dest}/**/*`], callback);
});
