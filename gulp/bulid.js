const gulp = require('gulp');
const gulp_sequence = require('gulp-sequence');

gulp.task('build', (callback) => {
    return gulp_sequence(
        'reset', [
            'bin',
            'config',
            'public',
            'routes',
            'views',
            'lib',
            'express',
            'package',
        ],
        'watch:express',
        callback
    );
});
