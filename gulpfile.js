const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const del = require('del');

const htmlHandler = ()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        "removeAttributeQuotes":true,   //移除属性上的双引号
        "removeComments":true,    //移除注释
        "collapseBooleanAttributes":true,  //把值为布尔值的属性简写
        "collapseWhitespace":true, //移除所有空格,变成一行代码
        "minifyCSS":true, //把页面里面的style标签里面的css样式也去空格
        "minifyJS":true,  //把页面里面的script标签里面的js代码也去空格))
    }))
    .pipe(gulp.dest('./dist/pages'))
}

const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}
const imgHandler = ()=>{
    return gulp.src('./src/img/**')
    .pipe(gulp.dest('./dist/img'))
}
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

const libHandler = ()=>{
    return gulp.src('./src/lib/**')
    .pipe(gulp.dest('./dist/lib'))
}

const delHandler = ()=>{
    return del(['./dist'])
}

const watchHandler = ()=>{
    gulp.watch('./src/*.html',htmlHandler)
    gulp.watch('./src/*.css',cssHandler)
    gulp.watch('./src/*.js',jsHandler)
    gulp.watch('./src/**',libHandler)
    gulp.watch('./img/**',imgHandler)
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(htmlHandler,cssHandler,jsHandler,imgHandler,libHandler),
    watchHandler
)