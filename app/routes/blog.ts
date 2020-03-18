import express from "express";
const router = express.Router();

import log4js from "../lib/modules/log4js";
const logger = log4js.getLogger();

import TwitterCard from "../lib/class/model/TwitterCard";

import EntryService from "../lib/service/EntryService";
import CategoryService from "../lib/service/CategoryService";

// 記事一覧を表示する
router.get("/", function(req, res, next) {
	const page = Number(req.query.page) || 1;
	EntryService.getEntries(page)
		.then(function(value) {
			res.render("main/blog", {
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

// 記事を表示する
router.get("/entry/:id(\\d+)", function(req, res, next) {
	const entryId = Number(req.params.id);
	EntryService.getEntry(entryId)
		.then(async function(value) {
			const twitterCard = new TwitterCard({
				// TODO: 定数化
				card: "summary_large_image",
				site: "@sinnkami_",
				title: value.entry.title,
				url: `https://${req.get("host")}/blog/entry/${value.entry.id}`,
			});
			res.render("main/blog", {
				contents: [value.entry],
				next: value.nextEntry ? value.nextEntry.id : "",
				back: value.backEntry ? value.backEntry.id : "",
				comments: value.entry.comments.length
					? value.entry.comments
					: [{ body: "<p>コメントがありません</p>" }],
				twitterCard: await twitterCard.createTwitterCard(value.entry),
			});
		})
		.catch(function(err) {
			logger.error(err);
			next("NotFound");
		});
});

// カテゴリ一覧を表示する
router.get("/category", function(req, res, next) {
	CategoryService.getCategories()
		.then(function(value) {
			const nameList = value.categoryList.map(value => value.name);
			res.render("main/lists", { listTitle: "カテゴリ一覧", href: "category", lists: nameList });
		})
		.catch(function(err) {
			logger.error(err);
			next("NotFound");
		});
});

// カテゴリーで記事を絞る
router.get(`/category/:name`, function(req, res, next) {
	const name = req.params.name;
	const page = Number(req.query.page) || 1;
	EntryService.getEntriesByCategoryName(name, page)
		.then(function(value) {
			res.render("main/blog", {
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

export = router;
