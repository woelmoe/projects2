// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );
const autoprefixer = require( 'autoprefixer' );

const IS_DEV = process.env.NODE_ENV === 'development';
// const IS_PROD = process.env.NODE_ENV === 'production';

console.log( "common config" );

module.exports = {
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
            },
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					sourceMap: IS_DEV
				}
            },
			{
				test: /\.s?css$/,
				use: [
					{
						loader: 'vue-style-loader',
						options: {
							sourceMap: IS_DEV
						}
                    },
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV
						}
                    },
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [ autoprefixer ]
						}
                    },
					{
						loader: 'sass-loader',
						options: {
							sourceMap: IS_DEV
						}
                    },
                ],
            },
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '/images/[name].[ext]',
							outputPath :  '/images/',
						}
					},
				],
			},
    ],
	},
	plugins: [
        new VueLoaderPlugin(),
  ]
}
