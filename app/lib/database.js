/*============================================================================*/
/* ■ database
/*----------------------------------------------------------------------------*/
/*  mysqlからデータを取得したり、insertしたりした後、Promiseを返す自作ライブラリ
/*============================================================================*/

const mysql = require('promise-mysql');
class SQL {
    constructor() {
        mysql.createConnection({
            host     : process.env.DB_HOSTS || 'localhost',
            user     : process.env.DB_USER || 'root',
            password : process.env.DB_PASSWORD || '',
            database : process.env.DATABASE || 'sinnkami-web',
            insecureAuth : true,
        }).then((connection) => {
            this.connection = connection;
        });
    }

    getEntriy(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `entries` where `id` = ? ", [id]).then(function(data) {
                resolve(data[0]);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getNextEntriy(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `entries` where `id` > ? order by `id` asc limit 1", [id]).then(function(data) {
                resolve(data[0]);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getBackEntriy(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `entries` where `id` < ? order by `id` desc limit 1", [id]).then(function(data) {
                resolve(data[0]);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getEntries(page = 1, limit = 10) {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `entries` order by `id` desc limit ?, ?", [(page - 1) * limit, limit]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getAllEntries() {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `entries` order by `id` desc").then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getCountEntries() {
        return new Promise((resolve, reject) => {
            this.connection.query("select COUNT(*) count from `entries`").then(function(data) {
                resolve(data[0]);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getComments(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `comments` where `entryID` = ?", [id]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getCountEntriesWhereTag(name) {
        return new Promise((resolve, reject) => {
            this.connection.query("select COUNT(*) count from `entries` WHERE `id` IN (SELECT `entryID` FROM `tags` WHERE `name` = ?)", [name]).then(function(data) {
                resolve(data[0]);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getEntriesWhereTag(name, page = 1, limit = 10) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM `entries` WHERE `id` IN (SELECT `entryID` FROM `tags` WHERE `name` = ?) order by `id` desc limit ?, ?", [name, (page - 1) * limit, limit]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getCountEntriesWhereCategory(name) {
        return new Promise((resolve, reject) => {
            this.connection.query("select COUNT(*) count from `entries` WHERE `id` IN (SELECT `entryID` FROM `category` WHERE `name` = ?)", [name]).then(function(data) {
                resolve(data[0]);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getEntriesWhereCategory(name, page = 1, limit = 10) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM `entries` WHERE `id` IN (SELECT `entryID` FROM `category` WHERE `name` = ?) order by `id` desc limit ?, ?", [name, (page - 1) * limit, limit]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getTagsNameList(limit = 5) {
        return new Promise((resolve, reject) => {
            this.connection.query("select `name`, `id` from `tags` order by `id` desc limit ?", [limit]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getAllTagsNameList() {
        return new Promise((resolve, reject) => {
            this.connection.query("select `name`, `id` from `tags` order by `id` desc").then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getTags(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `tags` where `entryID` = ?", [id]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getCategorysNameList(limit = 5) {
        return new Promise((resolve, reject) => {
            this.connection.query("select `name`, `id` from `category` order by `id` desc limit ?", [limit]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getAllCategorysNameList() {
        return new Promise((resolve, reject) => {
            this.connection.query("select `name`, `id` from `category` order by `id` desc").then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getCategory(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from `category` where `entryID` = ?", [id]).then(function(data) {
                resolve(data[0]);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    insertEntriy(data) {
        return new Promise((resolve, reject) => {
            this.connection.query("insert into `entries` (`title`, `body`, `create_at`, `update_at`) values (?, ?, ?, ?)", [data.title, data.contents, new Date(), new Date()]).then(function(data) {
                resolve(data.insertId);
            }).catch(function(err) {
                reject(err);
            });
        }).then((id) => {
            const promise = [];
            promise.push(new Promise((resolve, reject) => {
                this.connection.query("insert into `category` (`name`, `entryID`) values (?, ?)", [data.category, id]).then(function(data) {
                    resolve(data);
                }).catch(function(err) {
                    reject(err);
                });
            }));
            return Promise.all(promise).then(function(results) {
                return { entryID: id };
            });
        });
    }

    insertComment(data) {
        return new Promise((resolve, reject) => {
            this.connection.query("insert into `comments` (`entryID`, `author`, `body`, `create_at`, `ip`, `device`) values (?, ?, ?, ?, ?, ?)", [data.entryID, data.author, data.body, new Date(), data.ip, data.device]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    insertAccsessLog(data) {
        return new Promise((resolve, reject) => {
            this.connection.query("insert into `accsess_logs` (`method`, `status`, `url`, `response_time`, `ip`, `user_agent`, `create_at`) values (?, ?, ?, ?, ?, ?, ?)", [data.method, data.status, data.url, data.responseTime, data.ip, data.userAgent, new Date()]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    deleteAccsessLog(create_at) {
        return new Promise((resolve, reject) => {
            this.connection.query("delete from `accsess_logs` where create_at < ? ", [create_at]).then(function(data) {
                resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    updateEntriy(data) {
        return new Promise((resolve, reject) => {
            this.connection.query("update `entries` set `title`=?, `body`=?, `create_at`=?, `update_at`=? where `id` = ?", [data.title, data.contents, new Date(data.create_at), new Date(), data.id]).then(function() {
                resolve(data.id);
            }).catch(function(err) {
                reject(err);
            });
        }).then((id) => {
            const promise = [];
            promise.push(new Promise((resolve, reject) => {
                this.connection.query("update `category` set `name`=? where `entryID`=?", [data.category, id]).then(function(data) {
                    resolve(data);
                }).catch(function(err) {
                    reject(err);
                });
            }));

            return Promise.all(promise);
        });
    }
}

module.exports = new SQL();
