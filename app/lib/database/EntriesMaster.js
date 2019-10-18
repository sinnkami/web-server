const SQL = require('./SQL');

const squel = require('squel');
const squelMysql = squel.useFlavour('mysql');

const TABLE_NAME = "Entries";

class EntriesMaster extends SQL {
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

    async getByIds(ids) {
        const sql = squelMysql.select()
            .from(this.tableName)
            .where("id IN ?", ids)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results;
    }

    async getBackEntry(id) {
        const sql = squelMysql.select()
            .from(this.tableName)
            .where("id < ?", id)
            .order("id", false)
            .limit(1)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results[0];
    }

    async getNextEntry(id) {
        const sql = squelMysql.select()
            .from(this.tableName)
            .where("id > ?", id)
            .order("id", true)
            .limit(1)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results[0];
    }

    async getEntryListByLimitCount(offset, limit = 10) {
        const sql = squelMysql.select()
            .from(this.tableName)
            .limit(limit)
            .offset(offset)
            .order("id", false)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results;
    }

    async getEntriyCount() {
        const sql = squelMysql.select()
            .from(this.tableName)
            .field("COUNT(*)", "count")
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results[0].count;
    }

    async getEntriyCountByIds(ids) {
        const sql = squelMysql.select()
            .from(this.tableName)
            .field("COUNT(*)", "count")
            .where("id IN ?", ids)
            .toParam();
        const results = await this.select(sql.text, sql.values);
        return results[0].count;
    }
}

module.exports = EntriesMaster;
