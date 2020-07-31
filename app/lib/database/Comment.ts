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

	async get(): Promise<IComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	async getCommentListByEntryId(entryId: number): Promise<IComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId = ?", entryId)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	async insertComment(data: IComment): Promise<IComment[]> {
		const sql = squelMysql
			.insert()
			.into(this.tableName)
			.set("author", data.author)
			.set("content", data.content)
			.set("createAt", data.createAt)
			.set("ip", data.ip)
			.set("device", data.device)
			.toString();
		const results = await this.insert(sql);
		return results;
	}
}

export default new Comment();
