/*============================================================================*/
/* ■ isDevice
/*----------------------------------------------------------------------------*/
/*  アクセスして来たデバイスの種類を返す自作ライブラリ
/*============================================================================*/
import { UAParser } from "ua-parser-js";
import { Request } from "express";

export default function(req: Request): string {
	const device = new UAParser(req.headers["user-agent"]).getDevice();
	if (device.type === "tablet") {
		return "tablet";
	} else if (device.type === "mobile") {
		return "mobile";
	} else {
		return "desktop";
	}
}
