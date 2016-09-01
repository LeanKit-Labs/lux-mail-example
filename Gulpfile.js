var _ = require( "lodash" );
var gulp = require( "gulp" );
var gulpWebpack = require( "gulp-webpack" );
var gulpLivereload = require( "gulp-livereload" );
var gulpConcat = require( "gulp-concat" );

var webpackConfig = require( "./webpack.config.js" );


gulp.task( "dev", [ "watch", "webpack:watch", "css", "webpack:build" ], function() {} );

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

gulp.task( "webpack:build", function() {
	return gulp.src( "client/js/app.js" )
		.pipe( gulpWebpack( webpackConfig ) )
		.pipe( gulp.dest( "public/js/" ) );
} );

function runTests( options, done ) {
	var karma = require( "karma" ).server;
	karma.start( _.extend( {
		configFile: __dirname + "/karma.conf.js",
		singleRun: true

		// no-op keeps karma from process.exit'ing gulp
	}, options ), done || function() {} );
}

gulp.task( "webpack:test", function() {
	// webpackConfig.module.postLoaders = [
	// 	{
	// 		test: /\.jsx?$/,
	// 		exclude: /(spec|node_modules|lib)\//,
	// 		loader: "istanbul-instrumenter"
	// 	}
	// ];
	return gulp.src( "client/spec/index.js" )
		.pipe( gulpWebpack( webpackConfig, null, function() {} ) )
		.pipe( gulp.dest( "_spec-tmp/" ) );
} );

gulp.task( "test", [ "webpack:test" ], function() {
	runTests();
} );

gulp.task( "css", function() {
	return gulp.src( [ "client/css/lib/**/*.css", "client/css/app.css" ] )
		.pipe( gulpConcat( "app.css" ) )
		.pipe( gulp.dest( "public/css/" ) );
} );


gulp.task( "default", [ "css", "webpack:build" ] );
