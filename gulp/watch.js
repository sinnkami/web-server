const gulp = require("gulp");
const args = require("./lib/value");

const watch = require("gulp-watch");

gulp.task("watch:express", callback => {
	if (!args.watch) {
		return callback();
	}

	gulp.start(["server"]);

	watch(`${args.src}/bin/www.ts`, () => {
		return gulp.start(["bin", "server"]);
	});
	watch(`${args.src}/package.json`, () => {
		return gulp.start(["package", "server"]);
	});
	watch(`${args.src}/config/**/*`, () => {
		return gulp.start(["config", "server"]);
	});
	watch(`${args.src}/public/**/*`, () => {
		return gulp.start(["public"]);
	});
	watch(`${args.src}/lib/**/*`, () => {
		return gulp.start(["lib", "lib:min", "server"]);
	});
	watch(`${args.src}/routes/**/*`, () => {
		return gulp.start(["routes", "server"]);
	});
	watch(`${args.src}/views/**/*`, () => {
		return gulp.start(["views"]);
	});
	watch(`${args.src}/app.ts`, () => {
		return gulp.start(["express", "server"]);
	});
});
