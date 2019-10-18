const schedule = require("node-schedule");
const path = require("path");
const AccsessLogMaster = require('../database/AccsessLogMaster');
const accsessLogMaster = new AccsessLogMaster();

const jobName = path.basename(__filename);
require('date-utils');

const job = schedule.scheduleJob(jobName, '0 0 * * *', function() {
    const today = Date.today();
    accsessLogMaster.deleteByDate(today.remove({ "days": 7 }));
});

job.on("scheduled", function() {
    console.log(this.name + "の予定が登録されました");
});
job.on("run", function() {
    console.log(this.name + "の予定が実行されました");
});
job.on("canceled", function() {
    console.log(this.name + "の予定がキャンセルされました");
});
