var path = require( "path" );
var webpack = require( "webpack" );

module.exports = {
	entry: "./client/js/app.js",
	debug: true,
	output: {
		filename: "main.js"
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" }
		]
	},
	resolve: {
		alias: {
			"react": "react/dist/react-with-addons"
		},
		root: path.join( __dirname, "./client/js" )
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin( null, null, "[resource-path]", "[resource-path]" )
	]
};
