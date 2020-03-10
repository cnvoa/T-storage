const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();     // 用来打开一个浏览器

const html_path = ['./*.html', './*/*.html'];
const js_path = ['src/*.js', 'test/*'];


// 启本地服务，并打开浏览器
gulp.task('browser', function (cb) {
  browserSync.init({
    server: {
      baseDir: './',
      index: './index.html',
      directory: true
    },    // 访问目录，自动指向该目录下的 index.html 文件
    // proxy: "你的域名或IP"    // 设置代理
    port: 8000,
  });
  cb()
});

// 监听文件 文件改变
gulp.task('watch', function (cb) {
  gulp.watch(html_path, function (cb) {
    browserSync.reload();
    cb()
  })
  gulp.watch(js_path, function (cb) {
    gulp.src(js_path)
      .pipe(babel())
      .pipe(gulp.dest('demo'))

    browserSync.reload();
    cb()
  })
  cb()
});

// 开发时开启 browser 和 watch任务
gulp.task('server', gulp.series('browser', 'watch'));
