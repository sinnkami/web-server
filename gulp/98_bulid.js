const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("build", gulp.series(
	"reset",
	gulp.parallel("public", "views", "typescript", "package"),
	"watch:express",
));
