const SQL = require('./SQL');

const squel = require('squel');
const squelMysql = squel.useFlavour('mysql');

const TABLE_NAME = "Category";

class CategoryMaster extends SQL {
    constructor() {
        super();
        this.tableName = TABLE_NAME;
    }

    async get() {
        const sql = squelMysql.select()
            .from(this.tableName)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results;
    }

    async getById(id) {
        const sql = squelMysql.select()
            .from(this.tableName)
            .where("id = ?", id)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results[0];
    }

    async getByName(name) {
        const sql = squelMysql.select()
            .from(this.tableName)
            .where("name = ?", name)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results;
    }
}

module.exports = CategoryMaster;
