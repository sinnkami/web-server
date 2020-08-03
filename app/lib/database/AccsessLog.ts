import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IAccsessLog } from "../definitions/database/AccsessLog";

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
			.toString();
		const results = await this.select(sql);
		return results;
	}

	async deleteByDate(date: Date): Promise<IAccsessLog[]> {
		const sql = squelMysql
			.delete()
			.from(this.tableName)
			.where("createAt < ?", date)
			.toString();
		const results = await this.delete(sql);
		return results;
	}
}

export default new AccsessLog();
