import config from "config";

import CategoryService from "../../service/CategoryService";

import { RequestHandler } from "express";

class SettingCategoryListHandler {
	public static process(): RequestHandler {
		return (req, res, next): void => {
			// カテゴリー一覧を設定する
			const limit: number = config.get("maxCategory") || 5;
			CategoryService.getCategoriesByLimit(limit).then(function(value) {
				res.locals.categoryList = value.categoryList;
				next();
			});
		};
	}
}

export = SettingCategoryListHandler;
