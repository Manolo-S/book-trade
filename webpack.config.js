var path = require('path');


module.exports = {
	context: path.resolve('./public/js'),
	entry: {
		index: './index.js',
		mybooks: './mybooks.js',
		mybooks2: './mybooks2.js'
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
		preLoaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader'
		}],
		loaders: [{
			test: /\.es6$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url?limit=370000&minetype=application/font-woff"
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file"
		}]
	},

	resolve: {
		// alias: {
  //           jquery: path.resolve(__dirname, 'public', 'lib', 'jquery-2.2.3.js')
  //       },
		extensions: ['', '.js', '.es6']
	}
}