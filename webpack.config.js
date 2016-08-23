var path = require( "path" );
var webpack = require( "webpack" );

module.exports = {
	debug: true,
	output: {
		filename: "main.js"
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" },
			{ test: /sinon.*\.js/, loader: "imports?define=>false" }
		]
	},
	resolve: {
		root: path.join( __dirname, "./client/js" )
	},
	amdInjectLoader: {
		istanbul: true
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin( null, null, "[resource-path]", "[resource-path]" )
	]
};
