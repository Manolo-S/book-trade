var path = require('path');


module.exports = {
	context: path.resolve('./public/javascripts'),
	entry: {index: './index.js'},
	output: {
		path: path.resolve('build/js'),
		publicPath: '/public/assets/js/',
		filename: "[name].js"
	},
	devServer: {
		contentBase: 'public'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}