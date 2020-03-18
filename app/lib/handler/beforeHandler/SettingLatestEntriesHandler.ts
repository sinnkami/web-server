import config from "config";

import { RequestHandler } from "express";
import EntryService from "../../service/EntryService";

class SettingLatestEntriesHandler {
	public static process(): RequestHandler {
		return (req, res, next): void => {
			// 最新の記事を設定する
			EntryService.getLatestEntries().then(function(value) {
				const contents: { title: string; id: number }[] = [];
				value.entryList.forEach(function(value) {
					contents.push({ title: value.title, id: value.id });
				});
				res.locals.latestContents = contents;

				next();
			});
		};
	}
}

export = SettingLatestEntriesHandler;
