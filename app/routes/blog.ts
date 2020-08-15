import express from "express";
const router = express.Router();

import log4js from "../lib/modules/log4js";
const logger = log4js.getLogger();

import config from "config";

import TwitterCard from "../lib/class/model/TwitterCard";

import EntryService from "../lib/service/EntryService";
import CategoryService from "../lib/service/CategoryService";
import CommentService from "../lib/service/CommentService";
import Utility from "../lib/modules/Utility";

// 記事一覧を表示する
router.get("/", function(req, res, next) {
	const page = Number(req.query.page) || 1;
	EntryService.getEntries(page)
		.then(function(value) {
			res.render("pages/blog", {
				contents: value.entryList,
				currentPage: page,
				maxPage: Math.ceil(value.entryCount / 10),
			});
		})
		.catch(function(err) {
			logger.error(err);
			next(404);
		});
});

// 記事を表示する
router.get("/entry/:id(\\d+)", function(req, res, next) {
	const entryId = Number(req.params.id);
	EntryService.getEntry(entryId)
		.then(async function(value) {
			const twitterCard = new TwitterCard({
				card: config.get("twitter.cardType"),
				site: config.get("twitter.user"),
				title: value.entry.title,
				url: `https://${req.get("host")}/blog/entry/${value.entry.entryId}`,
			});

			if (req.session) {
				req.session.entryId = entryId;
			}

			res.render("pages/blog", {
				contents: [value.entry],
				next: value.nextEntry ? value.nextEntry.entryId : "",
				back: value.backEntry ? value.backEntry.entryId : "",
				comments: value.entry.comments.length
					? value.entry.comments
					: [{ content: "<p>コメントがありません</p>" }],
				twitterCard: await twitterCard.createTwitterCard(value.entry),
			});
		})
		.catch(function(err) {
			logger.error(err);
			next(404);
		});
});

// カテゴリ一覧を表示する
router.get("/category", function(req, res, next) {
	CategoryService.getCategories()
		.then(function(value) {
			const nameList = value.map((value) => value.name);
			res.render("pages/lists", { listTitle: "カテゴリ一覧", href: "category", lists: nameList });
		})
		.catch(function(err) {
			logger.error(err);
			next(404);
		});
});

// カテゴリーで記事を絞る
router.get(`/category/:name`, function(req, res, next) {
	const name = req.params.name;
	const page = Number(req.query.page) || 1;
	EntryService.getEntriesByCategoryName(name, page)
		.then(function(value) {
			res.render("pages/blog", {
				contents: value.entryList,
				currentPage: page,
				maxPage: Math.ceil(value.entryCount / 10),
			});
		})
		.catch(function(err) {
			logger.error(err);
			next(404);
		});
});

// コメントを投稿する
router.post("/comment", function(req, res, next) {
	const content = req.body.content;
	const author = req.body.author;
	const entryId = req.session ? req.session.entryId : 0;

	CommentService.insertComment({
		entryId,
		content,
		author,
		userAgent: Utility.getUserAgent(req),
		ip: Utility.getIp(req),
	})
		.then(function(value) {
			res.status(200).send(value);
		})
		.catch(function(err) {
			logger.error(err);
			next(500);
		});
});

export = router;
