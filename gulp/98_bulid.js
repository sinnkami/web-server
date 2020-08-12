const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("build", gulp.series(
	"reset",
	gulp.parallel(
		"public",
		"views",
		"package",
		"app",
		"bin",
		"config",
		"lib",
		"routes",
	),
	"watch:express",
));
