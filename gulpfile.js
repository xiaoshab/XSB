let gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	htmlmin = require("gulp-htmlmin"),
	babel = require("gulp-babel"),
	sass = require("gulp-sass"),
	connect = require("gulp-connect");

// 启动服务器
gulp.task("connect", function(){
	connect.server({
		root : "dist",
		livereload : true,
		port : 8080
	});
});

// 压缩html
gulp.task("html", function(){
	gulp.src("mingjian/**/*.html")
		.pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS:true}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
})

// 压缩JS
gulp.task("js", function(){
	gulp.src("mingjian/js/*.js")
		.pipe(babel({
			presets : ["es2015"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});

// 复制lib资源，images资源，mock数据资源
gulp.task("lib", function(){
	gulp.src(["mingjian/lib/**/*.*"])
		.pipe(gulp.dest("dist/lib"));
});
gulp.task("images", function(){
	gulp.src(["mingjian/images/**/*.*"])
		.pipe(gulp.dest("dist/images"));
});
gulp.task("mock", function(){
	gulp.src(["mingjian/mock/**/*.*"])
		.pipe(gulp.dest("dist/mock"));
});
gulp.task("copy", ["lib", "images", "mock"]);

// 编译SASS
gulp.task("sass", function(){
	gulp.src("mingjian/sass/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

// 监视文件修改
gulp.task("watch", function(){
	gulp.watch("mingjian/sass/*.scss", ["sass"]);
	gulp.watch("mingjian/**/*.js", ["js"]);
	gulp.watch("mingjian/**/*.html", ["html"]);
});

// 默认任务
gulp.task("default", ["connect", "copy", "html", "js", "sass", "watch"]);