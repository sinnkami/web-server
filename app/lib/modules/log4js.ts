import log4js, { Configuration } from "log4js";
import config from "config";

if (config.has("modules.log4js") && config.get("modules.log4js")) {
	const configure: Configuration = config.get("modules.log4js.configure");
	log4js.configure(configure);
}

export default log4js;
