import config from "config";

import { RequestHandler } from "express";
import EntryService from "../../service/EntryService";

// 表示する最新記事数
const LIMIT_ENTRIES = 5;

class SettingLatestEntriesHandler {
	private static readonly LIMIT_ENTRIES: number = config.get("limit.latestEntries") || LIMIT_ENTRIES;

	public static process(): RequestHandler {
		return (req, res, next): void => {
			// 最新の記事を設定する
			EntryService.getLatestEntries(this.LIMIT_ENTRIES).then(function(value) {
				// TODO: 型定義
				const contents: { title: string; id: number }[] = [];
				value.entryList.forEach(function(value) {
					contents.push({ title: value.title, id: value.entryID });
				});
				res.locals.latestContents = contents;

				next();
			});
		};
	}
}

export = SettingLatestEntriesHandler;
