import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IAccsessLog } from "../definitions/database/IAccsessLog";

const TABLE_NAME = "AccsessLog";

class AccsessLog extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<IAccsessLog[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async deleteByDate(date: Date): Promise<IAccsessLog[]> {
		const sql = squelMysql
			.delete()
			.from(this.tableName)
			.where("create_at < ?", date)
			.toParam();
		const results = await this.delete(sql.text, sql.values);
		return results;
	}
}

export default new AccsessLog();
