import schedule from "node-schedule";
import path from "path";

import log4js from "../modules/log4js";
const logger = log4js.getLogger();

import AccsessLog from "../database/AccsessLog";

const jobName = path.basename(__filename);
import moment from "moment";

const job = schedule.scheduleJob(jobName, "0 0 * * *", function() {
	const today = moment();
	AccsessLog.deleteByDate(today.subtract(7, "days").toDate());
});

job.on("run", function() {
	logger.debug(job.name + "の予定が実行されました");
});
job.on("canceled", function() {
	logger.debug(job.name + "の予定がキャンセルされました");
});

export default job;
