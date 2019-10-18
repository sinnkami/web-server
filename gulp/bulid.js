const gulp = require('gulp');
const gulp_sequence = require('gulp-sequence');
const args = require('./lib/value');

gulp.task('build', (callback) => {
    if (args.vendor === "express"){
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
    }
});
