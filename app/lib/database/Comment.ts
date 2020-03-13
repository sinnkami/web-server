import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IComment } from "../definitions/database/IComment";

const TABLE_NAME = "Comment";

class Comment extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<IComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async getCommentListByEntryId(entryId: number): Promise<IComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryID = ?", entryId)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async insertComment(data: IComment): Promise<IComment[]> {
		const sql = squelMysql
			.insert()
			.into(this.tableName)
			.set("entryId", data.entryId)
			.set("author", data.author)
			.set("body", data.body)
			.set("create_at", data.create_at)
			.set("ip", data.ip)
			.set("device", data.device)
			.toParam();
		const results = await this.insert(sql.text, sql.values);
		return results;
	}
}

export default new Comment();
