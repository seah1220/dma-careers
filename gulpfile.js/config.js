'use strict';

// This object will hold all configuration for our dev environment. Path to the build folder etc.
var Config = {
	src 	: './src',
	dest 	: './build',

	server 	: {
		host 	: 'localhost',
		port 	: '3000',
		type 	: 'development',
		root 	: './build'
	},

	jsLibs 	: [
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
	]
};

module.exports = Config;