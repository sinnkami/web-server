const gulp = require('gulp');
const plumber = require('gulp-plumber');
const args = require('./lib/value');

gulp.task('views', function() {
    return gulp.src(`${args.src}/views/**/*.pug`)
        .pipe(plumber())
        .pipe(gulp.dest(`${args.dest}/views`));
});
