import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IEntryComment } from "../definitions/database/EntryComment";

const TABLE_NAME = "EntryComment";

class EntryComment extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<IEntryComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}
}

export default new EntryComment();