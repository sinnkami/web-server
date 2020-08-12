const gulp = require("gulp");

const babel = require("gulp-babel");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');

const tsconfig = require("../../tsconfig.json");
const eslintrc = require("../../.eslintrc.json");

function typescriptCompile(src, dest, tsConfig = tsconfig.compilerOptions, eslintConfig = eslintrc) {
	return gulp
		.src(src)
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(eslint(eslintConfig))
		.pipe(eslint.format())
		.pipe(ts(tsConfig))
		.pipe(babel())
		// .pipe(sourcemaps.write("maps/"))//, { includeContent: false, sourceRoot: '../app/' }
		.pipe(gulp.dest(dest));
}

module.exports = typescriptCompile;