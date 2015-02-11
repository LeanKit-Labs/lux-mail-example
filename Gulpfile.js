var _ = require( "lodash" );
var gulp = require( "gulp" );
var gulpWebpack = require( 'gulp-webpack' );
var gulpLivereload = require( 'gulp-livereload' );

var webpackConfig = require( "./webpack.config.js" );


gulp.task( "dev", [ "watch", "webpack:watch", "build" ], function() {} );

gulp.task( "watch", function() {
	gulpLivereload.listen();
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


gulp.task( "default", [ "build" ] );
