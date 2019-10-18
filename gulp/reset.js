const gulp = require('gulp');
const del = require('del');
const args = require('./lib/value');

gulp.task('reset', (callback) => {
    return del([`${args.dest}/**/*`], callback);
});
