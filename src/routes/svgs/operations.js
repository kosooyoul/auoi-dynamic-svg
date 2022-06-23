const { default: axios } = require('axios');
var codes = require('../../consts/codes');

// operations
var operations = {
	'echo': async function (context, params) {
		return {
			"svg": [
				'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" viewBox="0 0 200 40" role="img">',
				'<rect width="198" height="38" x="1" y="1" rx="8" ry="8" style="fill: rgba(0, 100, 80, 0.8); stroke-width: 0.5; stroke: rgb(0, 100, 100)" />',
				'<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
				String(params.echo).toUpperCase(),
				'</text>',
				'</svg>'
			].join("\n"),
			"maxAge": 86400
		};
	},
	'date': async function (context, params) {
		return {
			"svg": [
				'<svg xmlns="http://www.w3.org/2000/svg" width="360" height="20" viewBox="0 0 720 40" role="img">',
				'<rect width="718" height="38" x="1" y="1" rx="8" ry="8" style="fill: rgba(0, 80, 100, 0.8); stroke-width: 0.5; stroke: rgb(0, 100, 100)" />',
				'<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
				new Date(),
				'</text>',
				'</svg>'
			].join("\n"),
			"maxAge": 0
		};
	},
	'age': async function (context, params) {
		const year = parseInt(params.y);
		const month = parseInt(params.m);
		const date = parseInt(params.d);
		const now = new Date();

		let age = now.getFullYear() - year;
		if (now.getMonth() + 1 < month) age--;
		else if (now.getDate() < date) age--;

		return {
			"svg": [
				'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" viewBox="0 0 200 40" role="img">',
				'<rect width="198" height="38" x="1" y="1" rx="8" ry="8" style="fill: rgba(100, 0, 80, 0.8); stroke-width: 0.5; stroke: rgb(160, 0, 120)" />',
				'<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
				age + " years old",
				'</text>',
				'</svg>'
			].join("\n"),
			"maxAge": 3600
		};
	},
	"github-repos": async function (context, params) {
		const id = "kosooyoul";
		const result = await axios("https://api.github.com/users/" + id + "/repos", { method: "GET" });
		const rawRepos = result.data || [];

		const highlights = (params.highlights || "").toLowerCase().split(",");
		const loves = (params.loves || "").toLowerCase().split(",").filter(love => love);

		const languages = {};

		const repos = rawRepos.map(repo => {
			if (repo.language) {
				languages[repo.language] = (languages[repo.language] || 0) + 1;
			}
			return {
				"name": repo.name,
				"fork": repo.fork,
				"language": repo.language,
				"description": repo.description,
				"highlight": highlights.includes((repo.language || "").toLowerCase()),
				"love": loves.find(love => (repo.name || "").includes(love)) != null,
				"html_url": repo.html_url,
				"updated_at": repo.updated_at
			}
		}).filter(repo => !repo.fork).sort((a, b) => {
			if (a.highlight && b.highlight) return 0;
			if (a.highlight) return -1;
			if (b.highlight) return 1;
			return new Date(b.updated_at) - new Date(a.updated_at)
		});

		const languagesArray = Object.keys(languages).map(language => ({
			name: language,
			count: languages[language]
		}));
		languagesArray.sort((a, b) => b.count - a.count);
		const hotLanguage = languagesArray[0];

		const svgHeight = (repos.length + 1) * 20;

		return {
			"svg": [
				'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="' + svgHeight + '" viewBox="0 0 800 ' + (svgHeight * 2) + '" role="img">',
				...repos.map((repo, i) => [
					'<a href="' + repo.html_url + '">',
					'<rect width="798" height="38" x="1" y="' + (i * 40 + 1) + '" rx="8" ry="8" style="fill: ' + (repo.highlight ? 'rgb(120, 160, 0)' : 'rgb(140, 140, 140)') + '"/>',
					'<text x="12" y="' + (i * 40 + 20) + '" text-anchor="start" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
					(repo.love ? "🧡" : "") + " " + repo.name + " - " + (repo.description || "").substr(0, 20),
					'</text>',
					'<text x="788" y="' + (i * 40 + 20) + '" text-anchor="end" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="white">',
					repo.language || "",
					'</text>',
					'</a>',
				].join("\n")),
				... (hotLanguage ? [
					'<text x="50%" y="' + (repos.length * 40 + 20) + '" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central" font-size="22" fill="rgb(60, 60, 60)">',
					"Developer in love with " + hotLanguage.name,
					'</text>',
				] : []),
				'</svg>'
			].join("\n"),
			"maxAge": 120
		};
	}
};

module.exports = operations;
