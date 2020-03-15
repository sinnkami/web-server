import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	next("NotImplemented");
});

export = router;
