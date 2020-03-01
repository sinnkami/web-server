const schedule = require("node-schedule");
const path = require("path");

const log4js = require('../log4js');
const logger = log4js.getLogger();

const AccsessLogMaster = require('../database/AccsessLogMaster');

const jobName = path.basename(__filename);
require('date-utils');

const job = schedule.scheduleJob(jobName, '0 0 * * *', function() {
    const today = Date.today();
    AccsessLogMaster.deleteByDate(today.remove({ "days": 7 }));
});

job.on("scheduled", function() {
    logger.debug(this.name + "の予定が登録されました");
});
job.on("run", function() {
    logger.debug(this.name + "の予定が実行されました");
});
job.on("canceled", function() {
    logger.debug(this.name + "の予定がキャンセルされました");
});

module.exports = job;
