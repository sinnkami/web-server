const gulp = require('gulp');
const args = require('./lib/value');

gulp.task('textboxio', function() {
    return gulp.src(`${args.src}/public/textboxio/**/*`)
        .pipe(gulp.dest(`${args.dest}/public/textboxio/`));
});
