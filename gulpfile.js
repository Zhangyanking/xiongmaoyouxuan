const gulp = require('gulp') //引入本地安装的gulp
const cssmin = require('gulp-cssmin') //css压缩处理
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const clean = require('gulp-clean') //清除目录
const webserver = require('gulp-webserver') //内置web服务器


gulp.task('css', function () {//打包css
    return gulp
        .src('./src/css/**')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('sass', function () {
    return gulp
        .src('./src/sass/**')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', function () {
    return gulp
        .src('./src/js/**')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('js', function () {
    return gulp
        .src('./src/js/**')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('html', function () {
    return gulp.src('./src/pages/**')
        .pipe(htmlmin({
            removeEmptyAttributes: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist/pages'))
})

gulp.task('img', function () {
    return gulp
        .src('./src/img/**')
        
        .pipe(gulp.dest('./dist/img'))
})
 
gulp.task('clean', function(){
    return gulp.src('./dist',{allowEmpty:true})
           .pipe(clean())
})

gulp.task('webserver',function(){
    return gulp.src('./dist')
           .pipe(webserver({
               host:'localhost',
               port:3000,
               livereload:true,
               open:'./pages/title.html'
           }))
})

gulp.task('watch',function(){
    gulp.watch('./src/css/**',gulp.parallel('css'))
    gulp.watch('./src/js/**',gulp.parallel('js'))
    gulp.watch('./src/sass/**',gulp.parallel('sass'))
    gulp.watch('./src/pages/**',gulp.parallel('html'))
    gulp.watch('./src/img/**',gulp.parallel('img'))
})

exports.default = gulp.series('clean', gulp.parallel('css', 'sass', 'js', 'html', 'img'))
exports.default = gulp.series(
    'clean',
     gulp.parallel('sass','css','js','html','img'),
     'webserver', 
     'watch')