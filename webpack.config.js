const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/dist"
	},
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
            filename: "index.html"
        })
    ]

};
