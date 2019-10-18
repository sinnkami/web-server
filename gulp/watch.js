const gulp = require('gulp');
const watch = require('gulp-watch');
const args = require('./lib/value');

gulp.task('watch:express', (callback) => {
    if (!args.watch) { return callback() }

    gulp.start(['server']);

    watch(`${args.src}/bin/www`, () => { return gulp.start(['bin', 'server']) });
    watch(`${args.src}/package.json`, () => { return gulp.start(['package', 'server']) });
    watch(`${args.src}/config/**/*`, () => { return gulp.start(['config', 'server']) });
    watch(`${args.src}/public/**/*`, () => { return gulp.start(['public']) });
    watch(`${args.src}/lib/**/*.js`, () => { return gulp.start(['lib', 'lib:min', 'server']) });
    watch(`${args.src}/routes/**/*.js`, () => { return gulp.start(['routes', 'server']) });
    watch(`${args.src}/views/${args.vendor}/**/*`, () => { return gulp.start(['views']) });
    watch(`${args.src}/${args.vendor}.js`, () => { return gulp.start([`${args.vendor}`, 'server']) });
});
