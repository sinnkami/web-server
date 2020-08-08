import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { ICategory } from "../definitions/database/Category";

const TABLE_NAME = "Category";

class Category extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	public async get(): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getById(id: number): Promise<ICategory> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("categoryId = ?", id)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	public async getByIds(ids: number[]): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("categoryId IN ?", ids)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getByName(name: string): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("name = ?", name)
			.toString();
		const results = await this.select(sql);
		return results;
	}
}

export default new Category();
