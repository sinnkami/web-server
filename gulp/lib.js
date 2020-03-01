const gulp = require('gulp');
const args = require('./lib/value');

gulp.task('lib', function(){
    return gulp.src([`${args.src}/lib/**/*.js`, `!${args.src}/lib**/*.min.js`])
        .pipe(gulp.dest(`${args.dest}/lib/`));
});

gulp.task('lib:min', function() {
    return gulp.src(`${args.src}/lib/**/*.min.js`)
        .pipe(gulp.dest(`${args.dest}/lib/`));
});
