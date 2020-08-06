import config from "config";
import log4js from "../../lib/modules/log4js";
const logger = log4js.getLogger();

import Entries from "../database/Entries";

import EntryData from "../class/model/EntryData";
import Category from "../database/Category";
import { IGetEntries, IGetEntry, IGetEntriesByCategoryName, IGetLatestEntries } from "../definitions/service/entry";
import { IUpdateEntryRequest } from "../definitions/routers/system/blog";
import { IEntries } from "../definitions/database/Entries";
import EntryCategory from "../database/EntryCategory";
import Utility from "../modules/Utility";
import ErrorService, { ErrorCode } from "./ErrorService";

// 一覧の記事数
const MAX_ENTRIES = 10;

class EntryService {
	private static readonly MAX_ENTRIES: number = config.get("limit.entries") || MAX_ENTRIES;

	public static async getEntries(page: number): Promise<IGetEntries> {
		const entryList = await Entries.getEntryListByLimitCount((page - 1) * this.MAX_ENTRIES, this.MAX_ENTRIES);
		if (!entryList.length) throw new Error("記事が取得できませんでした");

		const entryCount = await Entries.getEntriyCount();

		const entryDataList = await Promise.all(
			entryList.map((entry) => new EntryData(entry).createEntry({ addMoreTag: true }))
		);

		return {
			entryList: entryDataList,
			entryCount,
		};
	}

	public static async getEntry(entryId: number): Promise<IGetEntry> {
		const entry = await Entries.getById(entryId);
		if (!entry) throw new Error("記事が取得できませんでした");

		const nextEntry = await Entries.getNextEntry(entryId);
		const backEntry = await Entries.getBackEntry(entryId);
		const entryData = await new EntryData(entry).createEntry();

		return {
			entry: entryData,
			nextEntry,
			backEntry,
		};
	}

	// public async getEntriesByCategoryName(name: string, page: number): Promise<IGetEntriesByCategoryName> {
	// 	const categoryList = await Category.getByName(name);
	// 	if (!categoryList.length) throw new Error("カテゴリが取得できませんでした");

	// 	const entriIdList = categoryList.map((v) => v.entryId);
	// 	const entryList = await Entries.getEntryListByIdsAndLimitCount(
	// 		entriIdList,
	// 		(page - 1) * this.MAX_ENTRIES,
	// 		this.MAX_ENTRIES
	// 	);
	// 	if (!entryList.length) throw new Error("記事が取得できませんでした");

	// 	const entryCount = await Entries.getEntriyCountByIds(entriIdList);

	// 	const entryDataList = await Promise.all(
	// 		entryList.map((entry) => new EntryData(entry).createEntry({ addMoreTag: true }))
	// 	);

	// 	return {
	// 		entryList: entryDataList,
	// 		entryCount,
	// 	};
	// }

	public static async getLatestEntries(limit: number): Promise<IGetLatestEntries> {
		const entryList = await Entries.getEntryListByLimitCount(1, limit);
		const entryDataList = await Promise.all(entryList.map((entry) => new EntryData(entry).createEntry()));

		return {
			entryList: entryDataList,
		};
	}

	public static async insertEntry(req: IUpdateEntryRequest): Promise<IEntries> {
		// TODO: デフォルトカテゴリー
		const categoryId = req.categoryId ? req.categoryId : 1;
		const title = req.title;
		const content = req.content;
		// MEMO: 文字列で来るのでここで変換
		const post = Utility.toBoolean(req.post);

		// TODO: とりあえずuserid = 0
		const result = await Entries.insertEntry(0, title, content, post);
		if (!result) throw ErrorService.getError(ErrorCode.FailedToPostEntry);

		await EntryCategory.insertEntry(result.entryId, categoryId);
		return result;
	}

	public static async updateEntry(req: IUpdateEntryRequest): Promise<IEntries> {
		const entryId = req.entryId;
		if (!entryId) throw ErrorService.getError(ErrorCode.NotSelectedEntryId);
		const categoryId = req.categoryId ? req.categoryId : 1;
		const title = req.title;
		const content = req.content;
		// MEMO: 文字列で来るのでここで変換
		const post = Utility.toBoolean(req.post);

		// TODO: とりあえずuserid = 0
		const result = await Entries.updateEntry(0, entryId, title, content, post);
		if (!result) throw ErrorService.getError(ErrorCode.FailedToUpdateEntry);

		await EntryCategory.updateEntry(entryId, categoryId);
		return result;
	}
}

export default EntryService;
