const gulp = require('gulp');
const uglify = require('gulp-uglify');
const args = require('./lib/value');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const notify = require("gulp-notify");
const stripDebug = require('gulp-strip-debug');
const eslint = require('gulp-eslint');

const plumber = require('gulp-plumber');

gulp.task('scripts', function(){
    return gulp.src([`${args.src}/public/scripts/**/*.js`, `!${args.src}/public/scripts/**/*.min.js`])
        .pipe(plumber({
            errorHandler() {},
        }))
        // .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
        // .pipe(eslint.format())
        // .pipe(eslint.results(results => {
        // //Called once for all ESLint results.
        //     console.log(`Total Results: ${results.length}`);
        //     console.log(`Total Warnings: ${results.warningCount}`);
        //     console.log(`Total Errors: ${results.errorCount}`);
        // }))
        .pipe(babel({
            presets: ['env'],
        }).on('error', notify.onError(function(err) {
            gutil.log(`${gutil.colors.red(err.name)}`);
            console.log(err.message);
            console.log(err.codeFrame);
            let message = err.message.split(":")[1];
            let file_name = err.fileName.split("/").pop();
            return {
                message: `${message}`,
                title: `${err.name}: ${file_name}`,
            };
        })))
        .pipe(gulpif(args.compression, stripDebug()))
        .pipe(gulpif(args.compression, uglify({
            mangle: false, // true にすると変数名も変換されていろいろな場所がバグる
            compress: true,
        }).on('error', function(err) {
            gutil.log(err.toString());
            this.emit("end");
        })))
    // .pipe(rename(function(path){
    //   path.dirname = ".";
    // }))
        .pipe(gulp.dest(`${args.dest}/public/scripts/`));
});

gulp.task('scripts:min', function() {
    return gulp.src(`!${args.src}/public/scripts/**/*.min.js`)
        .pipe(gulp.dest(`${args.dest}/public/scripts/`));
});
