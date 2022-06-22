var codes = require('../../consts/codes');

// operations
var operations = {
	'echo': async function(context, params) {
		return [
			'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" viewBox="0 0 200 40" role="img">',
			'<rect width="198" height="38" x="1" y="1" rx="8" ry="8" style="fill: rgba(100, 0, 80, 0.6); stroke-width: 0.5; stroke: rgb(100, 0, 100)" />',
			'<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
			String(params.echo).toUpperCase(),
			'</text>',
			'</svg>'
		].join("\n");
	},
	'date': async function(context, params) {
		return [
			'<svg xmlns="http://www.w3.org/2000/svg" width="360" height="20" viewBox="0 0 720 40" role="img">',
			'<rect width="718" height="38" x="1" y="1" rx="8" ry="8" style="fill: rgba(100, 0, 80, 0.6); stroke-width: 0.5; stroke: rgb(100, 0, 100)" />',
			'<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
			new Date(),
			'</text>',
			'</svg>'
		].join("\n");
	},
	'age': async function(context, params) {
		const year = parseInt(params.y);
		const month = parseInt(params.m);
		const date = parseInt(params.d);
		const now = new Date();

		let age = now.getFullYear() - year;
		if (now.getMonth() + 1 < month) age--;
		else if (now.getDate() < date) age--;

		return [
			'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" viewBox="0 0 200 40" role="img">',
			'<rect width="198" height="38" x="1" y="1" rx="8" ry="8" style="fill: rgba(100, 0, 80, 0.8); stroke-width: 0.5; stroke: rgb(160, 0, 120)" />',
			'<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
			age + " years old",
			'</text>',
			'</svg>'
		].join("\n");
	},
};

module.exports = operations;
