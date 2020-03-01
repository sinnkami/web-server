const gls = require('gulp-live-server');
const gulp = require('gulp');
const args = require('./lib/value');
const server = gls(`${args.dest}/bin/www`, undefined, false);

gulp.task('server', function() {
    if (server) { server.stop(); }
    server.start();
});
