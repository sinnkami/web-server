const gulp = require("gulp");
const args = require("./lib/value");

const babel = require("gulp-babel");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript:normal", function() {
	return tsProject.src()
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
		.pipe(eslint.format())
		.pipe(tsProject())
		.pipe(babel())
		.pipe(sourcemaps.write("maps", {
			includeContent: false,
			sourceRoot: "./app",
		}))
		.pipe(gulp.dest(`${args.dest}/`));
});

gulp.task("typescript:min", function() {
	return gulp.src([`${args.src}/**/*.min.*`, `!${args.src}/node_modules/**/*`]).pipe(gulp.dest(`${args.dest}/`));
});

gulp.task("typescript", gulp.parallel("typescript:normal", "typescript:min"));