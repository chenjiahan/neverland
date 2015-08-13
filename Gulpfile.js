var gulp = require('gulp');
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');

var paths = {
    scripts: ['src/js/*.js'],
    css: ['src/scss/*.scss']
};

gulp.task('sass', function () {
    //编译并压缩src/scss目录下的文件,输出到build/css
    gulp.src('src/scss/*.scss')
        .pipe(changed('./build/css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack', function () {
    gulp.src('src/js/index.js')
        .pipe(babel())
        .pipe(gulp.dest('./build/js'))
        .pipe(webpack())
        .pipe(uglify())
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['webpack']);
    gulp.watch(paths.css, ['sass']);
});

gulp.task('default', ['watch', 'webpack', 'sass']);