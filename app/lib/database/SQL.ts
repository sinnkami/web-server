import config from "config";
import mysql, { Connection } from "promise-mysql";

import log4js from "../log4js";
const logger = log4js.getLogger();

class SQL {
	protected tableName = "";
	private connection!: Connection;

	constructor() {
		// TODO: コネクションプールを使用してパフォーマンスを良くしたい
		mysql
			.createConnection({
				host: config.get("db.host"),
				user: config.get("db.user"),
				password: config.get("db.password"),
				database: config.get("db.name"),
				insecureAuth: true,
			})
			.then(connection => {
				this.connection = connection;
			});
	}

	async select(sql: string, values: any[]): Promise<any[]> {
		logger.debug(sql);
		return this.connection.query(sql, values);
	}

	async insert(sql: string, values: any[]): Promise<any[]> {
		return this.connection.query(sql, values);
	}

	async update(sql: string, values: any[]): Promise<any[]> {
		return this.connection.query(sql, values);
	}

	async delete(sql: string, values: any[]): Promise<any[]> {
		return this.connection.query(sql, values);
	}
}

export default SQL;
