const gulp = require("gulp");
const args = require("./lib/value");

const babel = require("gulp-babel");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');

gulp.task("typescript:normal", function () {
	return gulp
		.src([`${args.src}/**/*.ts`, `!${args.src}/**/*.min.*`, `!${args.src}/node_modules/**/*`])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
		.pipe(eslint.format())
		.pipe(ts({
			"target": "ES6",
			"module": "commonjs",
			"allowJs": false,
			"declaration": false,
			"declarationMap": false,
			"rootDir": "./app",
			"removeComments": true,
			"noEmit": false,
			"isolatedModules": false,

			"esModuleInterop": true,

			"strict": true,

			"forceConsistentCasingInFileNames": true
		}))
		.pipe(babel())
		.pipe(sourcemaps.write("maps/"))//, { includeContent: false, sourceRoot: '../app/' }
		.pipe(gulp.dest(`${args.dest}/`));
});

gulp.task("typescript:min", function () {
	return gulp.src([`${args.src}/**/*.min.*`, `!${args.src}/node_modules/**/*`]).pipe(gulp.dest(`${args.dest}/`));
});

gulp.task("typescript", gulp.parallel("typescript:normal", "typescript:min"));
