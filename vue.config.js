const path = require("path");
const resolve = dir => {
	return path.join(__dirname, dir);
};
module.exports = {
	// devServer: {
	// 	port: 8066
	// },
	chainWebpack: config => {
		config.mode = "production";
	}
};
