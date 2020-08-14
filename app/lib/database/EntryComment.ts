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

	public async get(): Promise<IEntryComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getById(entryId: number): Promise<IEntryComment[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId = ?", entryId)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getByCommentId(commentId: number): Promise<IEntryComment> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("commentId = ?", commentId)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	public async insertComment(entryId: number, commentId: number): Promise<IEntryComment> {
		const sql = squelMysql
			.insert()
			.into(this.tableName)
			.set("entryId", entryId)
			.set("commentId", commentId)
			.toString();
		const result = await this.insert(sql);
		return await this.getByCommentId(result.insertId);
	}
}

export default new EntryComment();