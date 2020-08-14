const gulp = require("gulp");
const args = require("./lib/value");

const del = require("del");

gulp.task("reset:all", callback => {
	return del([`${args.dest}/**/*`, `!${args.dest}/node_modules/**/*`], callback);
})

gulp.task("reset:maps", callback => {
	return del([`${args.dest}/maps/**/*`], callback);
})

gulp.task("reset", gulp.series("reset:all"));
