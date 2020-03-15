const gulp = require("gulp");
const args = require("./lib/value");

const gulp_sequence = require("gulp-sequence");

gulp.task("build", callback => {
	return gulp_sequence("reset", ["public", "views", "typescript", "package"], "watch:express", callback);
});
