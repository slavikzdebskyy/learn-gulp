let gulp = require('gulp');
let	less = require('gulp-less');
let browserSync = require('browser-sync');
let cssNano = require('gulp-cssnano');
let rename = require('gulp-rename');
let del = require('del');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let autoprefixer = require('gulp-autoprefixer');

gulp.task('less', ()=>{
	return gulp.src('./app/less/main.less')
				.pipe(less())
				.pipe(autoprefixer({
					browsers: ['last 5 versions'],		
					cascade: false}))
				.pipe(gulp.dest('./app/css'))
				.pipe(browserSync.reload({stream: true}));
});


gulp.task('img', ()=> {
	return gulp.src('app/images/**/*')
				.pipe(imagemin({
					interlaced: true,
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
				}))
				.pipe(gulp.dest('dist/images'))
});

gulp.task('cssmin', ['less'], ()=>{
	return gulp.src('app/css/main.css')
				.pipe(cssNano())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest('app/css'));
});

gulp.task('start-browser', ()=>{
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watching', ['start-browser', 'less'], ()=>{
	gulp.watch('./app/less/main.less', ['less']);
	gulp.watch('./app/*.html', browserSync.reload);
	gulp.watch('./app/css/main.css', browserSync.reload);
});

gulp.task('clean',()=>{
	return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'cssmin'], ()=>{
	gulp.src('app/css/*min.css')
		.pipe(gulp.dest('dist/css'));
		gulp.src('app/webfonts/*.*')
		.pipe(gulp.dest('dist/webfonts'));
		gulp.src('app/js/*.js')
		.pipe(gulp.dest('dist/js'));
	gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});
