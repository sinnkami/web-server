import log4js, { Configuration } from "log4js";
import config from "config";

if (config.has("logger") && config.get("logger")) {
	const configure: Configuration = config.get("logger.configure");
	log4js.configure(configure);
}

export default log4js;
