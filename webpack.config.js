var path = require('path');


module.exports = {
	context: path.resolve('./public/js'),
	entry: {
			index: './index.js',
			mybooks: './mybooks.js'
			},
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
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader"
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}

