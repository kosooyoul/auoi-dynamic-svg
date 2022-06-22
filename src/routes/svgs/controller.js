var config = require("../../config");
var NAME = config.name;

var codes = require("../../consts/codes");

var operations = require("./operations");

var express = require("express");
var router = express.Router();

async function getController(req, res, next) {
	const operationName = req.params.operationName;
	const operation = operations[operationName];
	if (!operation) {
		return res.json({"success": false, "code": codes.NOT_FOUND, "message": "not found operation"});
	}

	const context = req.context;
	context.ip = req.headers["x-forwarded-for"] ||  req.connection.remoteAddress;
	context.userAgent = req.get("user-agent");
	context.request = req;
	context.response = res;

	const appName = context.appid || "Anonymous";
	const params = req.query || {};

	// call svg function
	try {
		const result = await operation(context, params);
		// res.header("content-type", "image/svg+xml");
		res.setHeader('Content-Type', 'image/svg+xml');
		res.setHeader('Cache-Control', 'public, max-age=0');
		res.send(result);

		console.log(new Date(), "App." + appName + " call Operation." + NAME + "." + operationName + ", Responsed: " + JSON.stringify({"code": result.code, "message": result.message, "success": result.success}));
	} catch (e) {
		res.json({"success": false, "code": codes.UNKNOWN_ERROR, "message": "error"});

		console.log(new Date(), "App." + appName + " call Operation." + NAME + "." + operationName + ", Error: " + e.message);
	}

}

// Get Operation 1
router.get("/:name1", async function(req, res, next) {
	req.params.operationName = req.params.name1;
	await getController(req, res, next);
});

// Get Operation 2
router.get("/:name1/:name2", async function(req, res, next) {
	req.params.operationName = req.params.name1 + "/" + req.params.name2;
	await getController(req, res, next);
});

module.exports = router;