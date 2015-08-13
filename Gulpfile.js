var gulp = require('gulp');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');

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

gulp.task('scripts', function () {
    //编译并压缩src/js目录下的文件,输出到build/js
    gulp.src('src/js/*.js')
        .pipe(changed('./build/js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.css, ['sass']);
});

gulp.task('default', ['watch', 'scripts', 'sass']);