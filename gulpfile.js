var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var connect = require('gulp-connect');
var src = "www";
var dest = "www/dist";
var lib ="";
var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
lib= "lib/{**/*.min.*,*.min.*}";
gulp.task('clean', function() {
 return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'www/dist/**/*'
  ]);

});
gulp.task('copyLib', function() {

  return gulp.src(lib).pipe(gulp.dest(dest+"/lib"));
});
gulp.task('copy', function() {

  return gulp.src(src+"/{css/*,font/**/*,js/**/*,templates/**/*,img/**/*,app.js,index.html,"+lib+"}")
      .pipe(gulp.dest(dest));

});

gulp.task('build', ['clean','copy']);

gulp.task('html', function () {
  gulp.src('./www/*.html')
      .pipe(connect.reload());
});

gulp.watch([
  'www/**/*.html',
  'www/**/*.css',
  'www/js/**/*.js',
  'www/img/**/*'
]).on('change', function (file) {
  gulp.task('build', ['clean','copy']);
  gulp.src( file.path)
      .pipe( connect.reload() );
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('server', function() {

  connect.server({
    root: ['www'],
    port: 9000,
    livereload: true
  });
});
gulp.task('server2', function() {

  connect.server({
    root: ['www/dist'],
    port: 9001,
    livereload: true
  });
});

gulp.task('default', ['server']);
