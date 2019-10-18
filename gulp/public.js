const gulp = require('gulp');

gulp.task('public', [
    'scripts',
    'images',
    'style',
    'json',
    'font',
    'scripts:min',
    'favicon',
    'textboxio',
]);
