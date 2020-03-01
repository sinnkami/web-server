const log4js = require('log4js');

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const config = require('config');

if (config.has("logger") && config.get("logger")) {
    const configure = config.get("logger.configure");
    log4js.configure(configure);
}

module.exports = log4js;
