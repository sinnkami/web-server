import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IEntries } from "../definitions/database/Entries";

const TABLE_NAME = "Entries";

class Entries extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async getById(id: number): Promise<IEntries> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("id = ?", id)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results[0];
	}

	async getByIds(ids: number[]): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("id IN ?", ids)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async getBackEntry(id: number): Promise<IEntries> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("id < ?", id)
			.order("id", false)
			.limit(1)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results[0];
	}

	async getNextEntry(id: number): Promise<IEntries> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("id > ?", id)
			.order("id", true)
			.limit(1)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results[0];
	}

	async getEntryListByLimitCount(offset: number, limit = 10): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.limit(limit)
			.offset(offset)
			.order("id", false)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async getEntryListByIdsAndLimitCount(ids: number[], offset: number, limit = 10): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("id IN ?", ids)
			.limit(limit)
			.offset(offset)
			.order("id", false)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async getEntriyCount(): Promise<number> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.field("COUNT(*)", "count")
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results[0].count;
	}

	async getEntriyCountByIds(ids: number[]): Promise<number> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.field("COUNT(*)", "count")
			.where("id IN ?", ids)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results[0].count;
	}
}

export default new Entries();
