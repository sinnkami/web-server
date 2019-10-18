const SQL = require('./SQL');

const squel = require('squel');
const squelMysql = squel.useFlavour('mysql');

const TABLE_NAME = "AccsessLog";

class AccsessLogMaster extends SQL {
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

    async deleteByDate(date) {
        const sql = squelMysql.delete()
            .from(this.tableName)
            .where("create_at < ?", date)
            .toParam();
        const results = await this.delete(sql.text, sql.values);
        return results;
    }
}

module.exports = AccsessLogMaster;
