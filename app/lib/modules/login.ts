import config from "config";
import ErrorService, { ErrorCode } from "../service/ErrorService";
import log4js from "./log4js";
const logger = log4js.getLogger();

export default async function(username: string, password: string): Promise<boolean> {
	if (username !== config.get("username")) throw ErrorService.getError(ErrorCode.FaildToLogin);
	if (password !== config.get("password")) throw ErrorService.getError(ErrorCode.FaildToLogin);
	return true;
}