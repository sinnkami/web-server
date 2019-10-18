const config = require('config');
const mysql = require('promise-mysql');

class SQL {
    constructor() {
        this.tableName = null;
        this._pool = mysql.createPool({
            host     : config.get("db.host"),
            user     : config.get("db.user"),
            password : config.get("db.password"),
            database : config.get("db.name"),
            insecureAuth : true,
            connectionLimit: config.get("db.connectionLimit"),
        });
        this._connection = null;

        this._pool.on('acquire', function(connection) {
            console.log('Connection %d acquired', connection.threadId);
        });
        this._pool.on('connection', function(connection) {
            connection.query('SET SESSION auto_increment_increment=1');
        });
        this._pool.on('enqueue', function() {
            console.log('Waiting for available connection slot');
        });
        this._pool.on('release', function(connection) {
            console.log('Connection %d released', connection.threadId);
        });
    }

    openConnection() {
        const pool = this._pool;
        return new Promise((resolve, reject) => {
            pool.getConnection().then((connect) => {
                this._connection = connect;
                return resolve(true);
            }).catch((error) => {
                return reject(error);
            });
        });
    }

    closeConnection() {
        return new Promise((resolve) => {
            this._connection.release();
            return resolve(true);
        });
    }

    async select(sql, values) {
        console.log(sql);
        await this.openConnection();

        return new Promise((resolve) => {
            this.closeConnection();
            return resolve(this._connection.query(sql, values));
        });
    }

    async insert(sql, values) {
        const isConnection = this._connection ? true : false;
        if (!isConnection) { await this.openConnection(); }

        return new Promise((resolve) => {
            if (!isConnection) { this.closeConnection(); }
            return resolve(this._connection.query(sql, values));
        });
    }

    async update(sql, values) {
        const isConnection = this._connection ? true : false;
        if (!isConnection) { await this.openConnection(); }

        return new Promise((resolve) => {
            if (!isConnection) { this.closeConnection(); }
            return resolve(this._connection.query(sql, values));
        });
    }

    async delete(sql, values) {
        const isConnection = this._connection ? true : false;
        if (!isConnection) { await this.openConnection(); }

        return new Promise((resolve) => {
            if (!isConnection) { this.closeConnection(); }
            return resolve(this._connection.query(sql, values));
        });
    }
}

module.exports = SQL;
