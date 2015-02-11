var _ = require( "lodash" );
var gulp = require( "gulp" );
var gulpWebpack = require( "gulp-webpack" );
var gulpLivereload = require( "gulp-livereload" );
var gulpConcat = require( "gulp-concat" );

var webpackConfig = require( "./webpack.config.js" );


gulp.task( "dev", [ "watch", "webpack:watch", "css", "build" ], function() {} );

gulp.task( "watch", function() {
	gulpLivereload.listen();
	gulp.watch( [ "client/css/**/*.css" ], [ "css" ] );
	gulp.watch( [ "public/{css,images}/**/*", "public/**/*.html" ] )
		.on( "change", gulpLivereload.changed );
	gulp.watch( [ "public/js/**/*" ] )
		.on( "change", _.debounce( gulpLivereload.changed, 150 ) );
} )

gulp.task( "webpack:watch", function() {
	webpackConfig.watch = true;
	webpackConfig.watchDelay = 250;
} );

gulp.task( "build", function() {
	return gulp.src( "client/js/app.js" )
		.pipe( gulpWebpack( webpackConfig ) )
		.pipe( gulp.dest( "public/js/" ) );
} );

gulp.task( "css", function() {
	return gulp.src( "client/css/**/*.css" )
		.pipe( gulpConcat( "app.css" ) )
		.pipe( gulp.dest( "public/css/" ) );
} );


gulp.task( "default", [ "build" ] );
