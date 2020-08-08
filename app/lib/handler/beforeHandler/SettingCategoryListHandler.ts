import config from "config";

import CategoryService from "../../service/CategoryService";

import { RequestHandler } from "express";

class SettingCategoryListHandler {
	public static process(): RequestHandler {
		return (req, res, next): void => {
			// カテゴリー一覧を設定する
			const limit: number = config.get("limit.category") || 5;
			CategoryService.getCategoriesByLimit(limit).then(function(values) {
				res.locals.categoryList = values;
				next();
			});
		};
	}
}

export = SettingCategoryListHandler;
