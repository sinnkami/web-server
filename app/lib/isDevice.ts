/*============================================================================*/
/* ■ isDevice
/*----------------------------------------------------------------------------*/
/*  アクセスして来たデバイスの種類を返す自作ライブラリ
/*============================================================================*/
import { UAParser } from "ua-parser-js";
import { Request } from "express";
import log4js from "./log4js";
const logger = log4js.getLogger();

export default function(req: Request): string {
	const device = new UAParser(req.headers["user-agent"]).getDevice();
	if (device.type === "tablet") {
		logger.debug("タブレット");
		return "tablet";
	} else if (device.type === "mobile") {
		logger.debug("スマホ・携帯");
		return "mobile";
	} else {
		logger.debug("パソコン");
		return "desktop";
	}
}
