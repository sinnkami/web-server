import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { ICategory } from "../definitions/database/ICategory";

const TABLE_NAME = "Category";

class Category extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}

	async getById(id: number): Promise<ICategory> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("id = ?", id)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results[0];
	}

	async getByName(name: string): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("name = ?", name)
			.toParam();
		const results = await this.select(sql.text, sql.values);
		return results;
	}
}

export default new Category();
