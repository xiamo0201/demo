"use strict";

//引入gulp
var gulp = require('gulp');

//引入组件
var uglify = require('gulp-uglify'); //压缩
var watch = require('gulp-watch');
var less = require('gulp-less'); //less
var cssmin = require('gulp-minify-css'); //压缩css
var spritesmith = require('gulp.spritesmith');

var baseUrl = '/';

//编译less
gulp.task('less', function() {
	gulp.src('./less/**.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(gulp.dest('./css'));
});

gulp.task('sprite', function() {
	return gulp.src('./img/*.png') //需要合并的图片地址
		.pipe(spritesmith({
			imgName: 'sprite.png', //保存合并后图片的地址
			cssName: './css/sprite.css', //保存合并后对于css样式的地址
			padding: 5, //合并时两个图片的间距
			algorithm: 'binary-tree', //注释1
		}))
	.pipe(gulp.dest('dist/'));
	/*
	var spriteData = gulp.src('img/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}));
	return spriteData.pipe(gulp.dest('output/'));*/
})

//监听js/less变化
gulp.task('default', function() {
	gulp.run(['less', 'sprite']);
	gulp.watch('./less/**.less', ['less']);
});