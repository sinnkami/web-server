const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const args = require('./lib/value');
const gulpif = require('gulp-if');

gulp.task('favicon', function() {
    return gulp.src(`${args.src}/public/favicon.ico`)
        .pipe(gulpif(args.compression, imagemin()))
        .pipe(gulp.dest(`${args.dest}/public/`));
});
