const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("watch:express", callback => {
	if (!args.watch) {
		return callback();
	}

	gulp.task("server").call();

	gulp.watch(`${args.src}/package.json`, gulp.series("package", "server"));
	gulp.watch(`${args.src}/public/**/*`, gulp.series("public"));
	gulp.watch(`${args.src}/views/**/*`, gulp.series("views"));
	gulp.watch(`${args.src}/**/*.ts`, gulp.series("typescript", "server"));
});
