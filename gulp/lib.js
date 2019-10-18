const gulp = require('gulp');
const args = require('./lib/value');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');

gulp.task('lib', function(){
    return gulp.src([`${args.src}/lib/**/*.js`, `!${args.src}/lib**/*.min.js`])
        // .pipe(eslint({ useEslintrc: true }))
        // .pipe(eslint.format())
        // .pipe(eslint.results(results => {
        // //Called once for all ESLint results.
        //     console.log(`Total Results: ${results.length}`);
        //     console.log(`Total Warnings: ${results.warningCount}`);
        //     console.log(`Total Errors: ${results.errorCount}`);
        // }))
        .pipe(gulp.dest(`${args.dest}/lib/`));
});

gulp.task('lib:min', function() {
    return gulp.src(`${args.src}/lib/**/*.min.js`)
        .pipe(gulp.dest(`${args.dest}/lib/`));
});
