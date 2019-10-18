const gulp = require('gulp');
const rename = require("gulp-rename");
const args = require('./lib/value');
const eslint = require('gulp-eslint');

gulp.task('express', function() {
    return gulp.src(`${args.src}/${args.vendor}.js`)
        // .pipe(eslint({ useEslintrc: true }))
        // .pipe(eslint.format())
        // .pipe(eslint.results(results => {
        // //Called once for all ESLint results.
        //     console.log(`Total Results: ${results.length}`);
        //     console.log(`Total Warnings: ${results.warningCount}`);
        //     console.log(`Total Errors: ${results.errorCount}`);
        // }))
        .pipe(rename("./app.js"))
        .pipe(gulp.dest(`${args.dest}/`));
});
