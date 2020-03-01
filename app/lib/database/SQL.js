const config = require('config');
const mysql = require('promise-mysql');

const log4js = require('../log4js');
const logger = log4js.getLogger();

class SQL {
    constructor() {
        this.tableName = null;

        // TODO: コネクションプールを使用してパフォーマンスを良くしたい
        mysql.createConnection({
            host     : config.get("db.host"),
            user     : config.get("db.user"),
            password : config.get("db.password"),
            database : config.get("db.name"),
            insecureAuth : true,
        }).then(connection => {
            this._connection = connection;
        });
    }

    async select(sql, values) {
        logger.debug(sql);
        return this._connection.query(sql, values);
    }

    async insert(sql, values) {
        return this._connection.query(sql, values);
    }

    async update(sql, values) {
        return this._connection.query(sql, values);
    }

    async delete(sql, values) {
        return this._connection.query(sql, values);
    }
}

module.exports = SQL;
