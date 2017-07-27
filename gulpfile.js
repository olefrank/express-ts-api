// jshint ignore: start

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const clean = require('gulp-clean');

// pull in the project TypeScript config
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('clean-script', () => {
    return gulp.src('dist/**/*.*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('scripts', ['clean-script'], () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('./src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);
