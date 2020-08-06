import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import moment from "moment";

import { IEntries } from "../definitions/database/Entries";

const TABLE_NAME = "Entries";

class Entries extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	public async get(): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getById(id: number): Promise<IEntries> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId = ?", id)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	public async getByIds(ids: number[]): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId IN ?", ids)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getBackEntry(id: number): Promise<IEntries> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId < ?", id)
			.order("entryId", false)
			.limit(1)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	public async getNextEntry(id: number): Promise<IEntries> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId > ?", id)
			.order("entryId", true)
			.limit(1)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	public async getEntryListByLimitCount(offset: number, limit = 10): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.limit(limit)
			.offset(offset)
			.order("entryId", false)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getEntryListByIdsAndLimitCount(ids: number[], offset: number, limit = 10): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId IN ?", ids)
			.limit(limit)
			.offset(offset)
			.order("entryId", false)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getEntriyCount(): Promise<number> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.field("COUNT(*)", "count")
			.toString();
		const results = await this.select(sql);
		return results[0].count;
	}

	public async getEntriyCountByIds(ids: number[]): Promise<number> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.field("COUNT(*)", "count")
			.where("entryId IN ?", ids)
			.toString();
		const results = await this.select(sql);
		return results[0].count;
	}

	public async insertEntry(userId: number, title: string, content: string, post: boolean): Promise<IEntries> {
		const sql = squelMysql
			.insert()
			.into(this.tableName)
			.set("userId", userId)
			.set("title", title)
			.set("content", content)
			.set("post", post)
			.toString();
		const result = await this.insert(sql);
		return this.getById(result.insertId);

	}

	public async updateEntry(userId: number, entryId: number, title: string, content: string, post: boolean): Promise<IEntries> {
		const sql = squelMysql
			.update()
			.table(this.tableName)
			.set("userId", userId)
			.set("title", title)
			.set("content", content)
			.set("post", post)
			.set("updateAt", squel.rstr("now()"))
			.where("entryId = ?", entryId)
			.toString();
		const result = await this.update(sql);
		return this.getById(entryId);

	}
}

export default new Entries();
