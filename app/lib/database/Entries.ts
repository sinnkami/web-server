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
			.toString();
		const results = await this.select(sql);
		return results;
	}

	async getById(id: number): Promise<IEntries> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId = ?", id)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	async getByIds(ids: number[]): Promise<IEntries[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId IN ?", ids)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	async getBackEntry(id: number): Promise<IEntries> {
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

	async getNextEntry(id: number): Promise<IEntries> {
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

	async getEntryListByLimitCount(offset: number, limit = 10): Promise<IEntries[]> {
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

	async getEntryListByIdsAndLimitCount(ids: number[], offset: number, limit = 10): Promise<IEntries[]> {
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

	async getEntriyCount(): Promise<number> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.field("COUNT(*)", "count")
			.toString();
		const results = await this.select(sql);
		return results[0].count;
	}

	async getEntriyCountByIds(ids: number[]): Promise<number> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.field("COUNT(*)", "count")
			.where("entryId IN ?", ids)
			.toString();
		const results = await this.select(sql);
		return results[0].count;
	}
}

export default new Entries();
