const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const args = require('./lib/value');
const gulpif = require('gulp-if');

gulp.task('images', function() {
    return gulp.src(`${args.src}/public/images/**/*`)
        .pipe(gulpif(args.compression, imagemin()))
        .pipe(gulp.dest(`${args.dest}/public/images`));
});
