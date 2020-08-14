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

	public async getById(commentId: number): Promise<IComment> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("commentId = ?", commentId)
			.toString();
		const results = await this.select(sql);
		return results[0];
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

	public async insertComment(author: string, content: string, ip: string, userAgent: string): Promise<IComment> {
		const sql = squelMysql
			.insert()
			.into(this.tableName)
			.set("author", author)
			.set("content", content)
			.set("ip", ip)
			.set("userAgent", userAgent)
			.set("createAt", squel.rstr("now()"))
			.toString();
		const result = await this.insert(sql);
		return await this.getById(result.insertId);
	}
}

export default new Comment();
