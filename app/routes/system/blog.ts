import express from "express";
import log4js from "../../lib/modules/log4js";
const logger = log4js.getLogger();

import EntryService from "../../lib/service/EntryService";
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	const page = Number(req.query.page) || 1;
	EntryService.getEntries(page)
		.then(function(value) {
			res.render("pages/system/blog", {
				contents: value.entryList,
				currentPage: page,
				maxPage: Math.ceil(value.entryCount / 10),
			});
		})
		.catch(function(err) {
			logger.error(err);
			next("NotFound");
		});
});

router.get("/edit", function(req, res) {
	res.render("pages/system/edit");
});

export = router;
