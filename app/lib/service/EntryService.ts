import config from "config";

import Entries from "../database/Entries";

import EntryData from "../class/model/EntryData";
import Category from "../database/Category";
import { IGetEntries, IGetEntry, IGetEntriesByCategoryName } from "../definitions/service/entry";
import { IUpdateEntryRequest } from "../definitions/routers/system/blog";
import { IEntries } from "../definitions/database/Entries";
import EntryCategory from "../database/EntryCategory";
import Utility from "../modules/Utility";
import ErrorService, { ErrorCode } from "./ErrorService";

// 一覧の記事数
const MAX_ENTRIES = 10;

class EntryService {
	private static readonly MAX_ENTRIES: number = config.get("limit.entries") || MAX_ENTRIES;

	public static async getEntries(page: number, isPost?: boolean): Promise<IGetEntries> {
		const entryList = await Entries.getEntryListByLimitCount((page - 1) * this.MAX_ENTRIES, this.MAX_ENTRIES, isPost);
		if (!entryList.length) throw ErrorService.getError(ErrorCode.FailedToGetEntry);

		const entryCount = await Entries.getEntriyCount(isPost);

		const entryDataList = await Promise.all(
			entryList.map((entry) => new EntryData(entry).createEntry({ addMoreTag: true }))
		);

		return {
			entryList: entryDataList,
			entryCount,
		};
	}

	public static async getEntry(entryId: number, isPost?: boolean): Promise<IGetEntry> {
		const entry = await Entries.getById(entryId, isPost);
		if (!entry) throw ErrorService.getError(ErrorCode.FailedToGetEntry);

		const nextEntry = await Entries.getNextEntry(entryId, isPost);
		const backEntry = await Entries.getBackEntry(entryId, isPost);
		const entryData = await new EntryData(entry).createEntry();

		return {
			entry: entryData,
			nextEntry,
			backEntry,
		};
	}

	public static async getEntriesByCategoryName(name: string, page: number, isPost?: boolean): Promise<IGetEntriesByCategoryName> {
		const category = await Category.getByName(name);
		if (!category) throw new Error("カテゴリが取得できませんでした");


		const entryCategoryList = await EntryCategory.getByCategoryId(category.categoryId);
		const entryIdList = entryCategoryList.map((value) => value.entryId);

		const entryList = await Entries.getEntryListByIdsAndLimitCount(
			entryIdList,
			(page - 1) * this.MAX_ENTRIES,
			this.MAX_ENTRIES,
			isPost,
		);
		if (!entryList.length) throw ErrorService.getError(ErrorCode.FailedToGetEntry);

		const entryCount = await Entries.getEntriyCountByIds(entryIdList, isPost);

		const entryDataList = await Promise.all(
			entryList.map((entry) => new EntryData(entry).createEntry({ addMoreTag: true }))
		);

		return {
			entryList: entryDataList,
			entryCount,
		};
	}

	public static async getLatestEntries(limit: number, isPost?: boolean): Promise<EntryData[]> {
		const entryList = await Entries.getEntryListByLimitCount(1, limit, isPost);

		const entryDataList = await Promise.all(entryList.map((entry) => new EntryData(entry).createEntry()));

		return entryDataList;
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
