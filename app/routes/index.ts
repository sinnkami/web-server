import passport from "passport";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	res.render("main/index");
});

router.get("/login", function(req, res) {
	res.render("system/login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

export = router;
