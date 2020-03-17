import config from "config";

import Entries from "../database/Entries";

import EntryData from "../class/model/EntryData";

import { IEntries } from "../definitions/database/Entries";
import Category from "../database/Category";

// 一覧の記事数
const MAX_ENTRIES = 10;

export interface IGetEntries {
	entryList: EntryData[];
	entryCount: number;
}

export interface IGetEntry {
	entry: EntryData;
	nextEntry: IEntries;
	backEntry: IEntries;
}

export type IGetEntriesByCategoryName = IGetEntries;

class EntryService {
	private readonly MAX_ENTRIES: number = config.get("maxEntries") || MAX_ENTRIES;

	public async getEntries(page: number): Promise<IGetEntries> {
		const entryList = await Entries.getEntryListByLimitCount((page - 1) * this.MAX_ENTRIES, this.MAX_ENTRIES);
		if (!entryList.length) throw new Error("記事が取得できませんでした");

		const entryCount = await Entries.getEntriyCount();

		const entryDataList = await Promise.all(
			entryList.map(entry => new EntryData(entry).createEntry({ addMoreTag: true }))
		);

		return {
			entryList: entryDataList,
			entryCount,
		};
	}

	public async getEntry(entryId: number): Promise<IGetEntry> {
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

	public async getEntriesByCategoryName(name: string, page: number): Promise<IGetEntriesByCategoryName> {
		const categoryList = await Category.getByName(name);
		if (!categoryList.length) throw new Error("カテゴリが取得できませんでした");

		const entriIdList = categoryList.map(v => v.entryId);
		const entryList = await Entries.getEntryListByIdsAndLimitCount(
			entriIdList,
			(page - 1) * this.MAX_ENTRIES,
			this.MAX_ENTRIES
		);
		if (!entryList.length) throw new Error("記事が取得できませんでした");

		const entryCount = await Entries.getEntriyCountByIds(entriIdList);

		const entryDataList = await Promise.all(
			entryList.map(entry => new EntryData(entry).createEntry({ addMoreTag: true }))
		);

		return {
			entryList: entryDataList,
			entryCount,
		};
	}
}

export default new EntryService();
