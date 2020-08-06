const gulp = require("gulp");
const args = require("./lib/value");

const gls = require("gulp-live-server");
const server = gls(`${args.dest}/bin/www`, { env: { NODE_ENV: 'test' } }, false);

gulp.task("server", function () {
	if (server) {
		server.stop();
	}
	server.start();
});
