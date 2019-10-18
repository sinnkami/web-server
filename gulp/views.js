const gulp = require('gulp');
const pug = require("gulp-pug");
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const args = require('./lib/value');

gulp.task('views', function() {
    return gulp.src(`${args.src}/views/${args.vendor}/**/*.pug`)
        .pipe(plumber())
        .pipe(gulpif(args.vendor === "express", gulp.dest(`${args.dest}/views`)));
});
