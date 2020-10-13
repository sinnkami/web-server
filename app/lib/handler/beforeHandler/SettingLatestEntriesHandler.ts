import config from "config";

import log4js from "../../modules/log4js";
const logger = log4js.getLogger();

import { RequestHandler } from "express";
import EntryService from "../../service/EntryService";

// 表示する最新記事数
const LIMIT_ENTRIES = 5;

class SettingLatestEntriesHandler {
	private static readonly LIMIT_ENTRIES: number = config.get("limit.latestEntries") || LIMIT_ENTRIES;

	public static process(): RequestHandler {
		return (req, res, next): void => {
			// 最新の記事を設定する
			EntryService.getLatestEntries(this.LIMIT_ENTRIES).then(function(values) {
				res.locals.latestContents = values || [];
				next();
			}).catch(function(err) {
				logger.error(err);
				next(500);
			});
		};
	}
}

export = SettingLatestEntriesHandler;
