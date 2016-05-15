'use-strict';

// Import our configuration
var Config 			= require('./config');

// Import all the node modules that we need
var gulp 			= require('gulp'),
	del 			= require('del'),
	sass 			= require('gulp-sass'),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat 			= require('gulp-concat'),
	server 			= require('gulp-server-livereload'),
	nunjucks 		= require('gulp-nunjucks-render'),
	data 			= require('gulp-data'),
	fs 				= require('fs'),
	path 			= require('path'),
	livereload 		= require('gulp-livereload');



// This task will be executed when you run the first starting command
// npm run start
gulp.task('default', function() {
	gulp.start('html');
	gulp.start('sass');
	gulp.start('js');
	gulp.start('images');
	gulp.start('fonts');
});


// This task will put a watcher on the src files and trigger the according task
// npm run watch
gulp.task('watch', function() {
	gulp.watch(Config.src + '/html/**/*.html', ['html']);
	gulp.watch(Config.src + '/data/*.json', ['html']);
	gulp.watch(Config.src + '/sass/**/*.scss', ['sass']);
	gulp.watch(Config.src + '/js/**/*.js', ['js']);
	gulp.watch(Config.src + '/assets/images/*', ['images']);
	gulp.watch(Config.src + '/assets/fonts/*', ['fonts']);
});


// This task sets up a server for us to see the work locally
// npm run server
gulp.task('server', function() {
	gulp.start('default');
	
	gulp.src(Config.server.root)
		.pipe(server({
			host: Config.server.host,
			port: Config.server.port,
			livereload: true,
			open: true,
			defaultFile: 'index.html'
		}));

	gulp.start('watch');
});


// Task to clean the build folder
gulp.task('clean', function() {
	del(['build']);
})


// Our HTML needs to be copied into the build folder
gulp.task('html', function(){

	gulp.src(Config.src + '/html/*.html')
		.pipe(data(function(file) {
			return JSON.parse(fs.readFileSync('./src/data/' + path.basename(file.path).slice(0, -5) + '.json'));
	      //return require('../src/data/' + path.basename(file.path).slice(0, -5) + '.json');
	    }))
		.pipe(nunjucks({
			path: Config.src + '/html/'
		}))
		.pipe(gulp.dest(Config.dest))
		.pipe(livereload());

});



// Task to compile all sass files into css, which a browser can interpret.
gulp.task('sass', function() {

	gulp.src(Config.src + '/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(Config.dest + '/css'))
		.pipe(livereload());

});


// Task to move all JS files to the build folder
gulp.task('js', function() {

	gulp.src(Config.jsLibs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(Config.dest + '/js'));

	gulp.src(Config.src + '/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest(Config.dest + '/js'))
		.pipe(livereload());

});


// Task to move all image files to the build folder
gulp.task('images', function() {

	gulp.src(Config.src + '/assets/images/*')
		.pipe(gulp.dest(Config.dest + '/images'))
		.pipe(livereload());

});


// Task to move all font files to the build folder
gulp.task('fonts', function() {

	gulp.src(Config.src + '/assets/fonts/*')
		.pipe(gulp.dest(Config.dest + '/css/fonts'))
		.pipe(livereload());

});
