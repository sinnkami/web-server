import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { ITag } from "../definitions/database/Tag";

const TABLE_NAME = "Tag";

class Tag extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<ITag[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}
}

export default new Tag();