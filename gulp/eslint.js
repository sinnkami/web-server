const gulp = require("gulp");
const args = require("./lib/value");

const watch = require("gulp-watch");
const eslint = require("gulp-eslint");

gulp.task("eslint", function() {
	return gulp
		.src([`${args.src}/**/*.js`, `!${args.src}/*.min.js`])
		.pipe(eslint({ useEslintrc: true }))
		.pipe(eslint.format())
		.pipe(
			eslint.results(results => {
				//Called once for all ESLint results.
				console.log(`Total Results: ${results.length}`);
				console.log(`Total Warnings: ${results.warningCount}`);
				console.log(`Total Errors: ${results.errorCount}`);
			})
		);
});

gulp.task("watch:eslint", function() {
	watch(`${args.src}/bin/www`, () => {
		return gulp
			.src([`${args.src}/bin/www`])
			.pipe(eslint({ useEslintrc: true }))
			.pipe(eslint.format())
			.pipe(
				eslint.results(results => {
					//Called once for all ESLint results.
					console.log(`Total Results: ${results.length}`);
					console.log(`Total Warnings: ${results.warningCount}`);
					console.log(`Total Errors: ${results.errorCount}`);
				})
			);
	});
	watch(`${args.src}/public/**/*.js`, () => {
		return gulp
			.src([`${args.src}/public/**/*.js`])
			.pipe(eslint({ useEslintrc: true }))
			.pipe(eslint.format())
			.pipe(
				eslint.results(results => {
					//Called once for all ESLint results.
					console.log(`Total Results: ${results.length}`);
					console.log(`Total Warnings: ${results.warningCount}`);
					console.log(`Total Errors: ${results.errorCount}`);
				})
			);
	});
	watch(`${args.src}/lib/**/*.js`, () => {
		return gulp
			.src([`${args.src}/lib/**/*.js`])
			.pipe(eslint({ useEslintrc: true }))
			.pipe(eslint.format())
			.pipe(
				eslint.results(results => {
					//Called once for all ESLint results.
					console.log(`Total Results: ${results.length}`);
					console.log(`Total Warnings: ${results.warningCount}`);
					console.log(`Total Errors: ${results.errorCount}`);
				})
			);
	});
	watch(`${args.src}/routes/**/*.js`, () => {
		return gulp
			.src([`${args.src}/routes/**/*.js`])
			.pipe(eslint({ useEslintrc: true }))
			.pipe(eslint.format())
			.pipe(
				eslint.results(results => {
					//Called once for all ESLint results.
					console.log(`Total Results: ${results.length}`);
					console.log(`Total Warnings: ${results.warningCount}`);
					console.log(`Total Errors: ${results.errorCount}`);
				})
			);
	});
	watch(`${args.src}/app.js`, () => {
		return gulp
			.src([`${args.src}/app.js`])
			.pipe(eslint({ useEslintrc: true }))
			.pipe(eslint.format())
			.pipe(
				eslint.results(results => {
					//Called once for all ESLint results.
					console.log(`Total Results: ${results.length}`);
					console.log(`Total Warnings: ${results.warningCount}`);
					console.log(`Total Errors: ${results.errorCount}`);
				})
			);
	});
});
