const gulp = require('gulp');
const sass = require('gulp-sass');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const copy = require('gulp-copy');
const autoprefixer = require('gulp-autoprefixer');

function clean() {
  return del(['build']);
}

function clean_modules() {
  return del(['node_modules']);
}

function swap_variables() {
  let target = ['assets/sass/_variables.scss'];

  return gulp.src(target).pipe(gulp.dest('assets/lib/bootstrap/stylesheets'));
}

function bootstrap_fonts() {
  let target = ['assets/lib/bootstrap/fonts/bootstrap/*'];

  return gulp.src(target).pipe(gulp.dest('build/fonts/bootstrap'));
}

function scss() {
  let target = ['assets/sass/main.scss'];

  return gulp
    .src(target)
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'));
}

function bootstrap_dialog() {
  let target = ['assets/lib/bootstrap-dialog/bootstrap-dialog.less'];

  return gulp
    .src(target)
    .pipe(less())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'));
}

function scripts() {
  const target = [
    'node_modules/ace-builds/src/ace.js',
    'node_modules/ace-builds/src/mode-lua.js',
    'node_modules/ace-builds/src/theme-github.js',
    'node_modules/ace-builds/src/worker-lua.js'
  ];

  return gulp
    .src(target)
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
}

function fonts() {
  let target = ['assets/fonts/**'];

  return gulp.src(target).pipe(copy('build', { prefix: 1 }).pipe(gulp.dest('build/fonts')));
}

function images() {
  let target = ['assets/images/*'];

  return gulp.src(target).pipe(copy('build', { prefix: 1 }).pipe(gulp.dest('build/images')));
}

const build_series = gulp.series(scss, scripts, bootstrap_dialog, fonts, bootstrap_fonts, images);
const setup_series = gulp.series(clean, swap_variables);

// TASKS
gulp.task('clean', clean);
gulp.task('clean-modules', clean_modules);
gulp.task('setup', setup_series);
gulp.task('build', build_series);
