import config from "config";

import CategoryService from "../../service/CategoryService";

import log4js from "../../modules/log4js";
const logger = log4js.getLogger();

import { RequestHandler } from "express";

class SettingCategoryListHandler {
	public static process(): RequestHandler {
		return (req, res, next): void => {
			// カテゴリー一覧を設定する
			const limit: number = config.get("limit.category") || 5;
			CategoryService.getCategoriesByLimit(limit).then(function(values) {
				res.locals.categoryList = values || [];
				next();
			}).catch(function(err) {
				logger.error(err);
				next(500);
			});
		};
	}
}

export = SettingCategoryListHandler;
