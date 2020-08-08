import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IComment } from "../definitions/database/Comment";

const TABLE_NAME = "Comment";

class Comment extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	public async get(): Promise<IComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getbyIdList(commentIdList: number[]): Promise<IComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("commentId IN ?", commentIdList)
			.toString();
		const results = await this.select(sql);
		return results;
	}
}

export default new Comment();
