const path = require( 'path' );
const merge = require( 'webpack-merge' )
const baseConfig = require( './webpack.base.config.js' )
const IS_DEV = process.env.NODE_ENV === 'development';

const webpack = require( 'webpack' )

let entryArray = IS_DEV ? [ './src/entry-client.js', 'webpack-hot-middleware/client' ] : [ './src/entry-client.js' ];
const CopyPlugin = require('copy-webpack-plugin');
console.log( entryArray );
console.log( 'client config' );
module.exports = merge( baseConfig, {
	entry: entryArray,
	output: {
		filename: '[name].js',
		sourceMapFilename: '[name].js.map',
		path: path.resolve( __dirname, './dist' ),
		publicPath: '/dist/',
	},
	module: {
		rules: []
	},
	plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
						new CopyPlugin({
				patterns: [
						{
							from: path.resolve(__dirname, './src/images'),
							to:   path.resolve(__dirname, 'dist/images')
						}
					]
				})
  ]
} )
