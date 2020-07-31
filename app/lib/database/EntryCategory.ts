import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IEntryCategory } from "../definitions/database/EntryCategory";

const TABLE_NAME = "EntryCategory";

class EntryCategory extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<IEntryCategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}
}

export default new EntryCategory();