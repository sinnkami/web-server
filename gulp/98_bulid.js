const gulp = require("gulp");
const args = require("./lib/value");

gulp.task("build", gulp.series(
	"reset",
	gulp.parallel(
		"public",
		"views",
		"package",
		"typescript",
		// MEMO: 以下ファイル群は個別指定したものだけれど時間が掛かるので使わなくなった
		// ただ、ファイルは残しておく
		// "app",
		// "bin",
		// "config",
		// "lib",
		// "routes",
	),
	"watch:express",
));
