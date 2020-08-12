const gulp = require("gulp");
const args = require("./lib/value");
const watch = require("gulp-watch")
gulp.watch = watch;

gulp.task("watch:express", callback => {
	if (!args.watch) {
		return callback();
	}

	gulp.watch(`${args.src}/package.json`, gulp.series("package"));
	gulp.watch(`${args.src}/public/**/*`, gulp.series("public"));
	gulp.watch(`${args.src}/views/**/*`, gulp.series("views"));
	gulp.watch(`${args.src}/app.ts`, gulp.series("app"));
	gulp.watch(`${args.src}/bin/www.ts`, gulp.series("bin"));
	gulp.watch(`${args.src}/config/**/*.ts`, gulp.series("config"));
	gulp.watch(`${args.src}/lib/**/*.ts`, gulp.series("lib"));
	gulp.watch(`${args.src}/routes/**/*.ts`, gulp.series("routes"));

});
