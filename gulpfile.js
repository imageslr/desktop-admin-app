// 获取 gulp
var gulp = require('gulp')

// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')

var gutil = require('gulp-util')

gulp.task('scripts', function() {
  return gulp.src(['dev_assets/scripts/*.js'])
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('public/js'))
    .pipe(livereload());
})

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    return gulp.src(['dist/*.js'])
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist-min'))
    .pipe(livereload());
})


// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['script'])