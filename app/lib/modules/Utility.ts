import { Request } from "express";
import { UAParser } from "ua-parser-js";

class Utility {
	// 文字列なtrue/falseをboolean型へ変換する
	public static toBoolean(text: string): boolean {
		return text.toLowerCase() === "true";
	}

	// ドメインを取得する
	public static getDomain(req: Request): string {
		return req.protocol + '://' + req.get('Host');
	}

	// ユーザーエージェントを取得する
	public static getUserAgent(req: Request): string {
		const userAgent = this.getUserAgentParser(req);
		return userAgent.getUA();
	}

	public static getIp(req: Request): string {
		if (req.connection && req.connection.remoteAddress) {
			return req.connection.remoteAddress;
		}
		if (req.socket && req.socket.remoteAddress) {
			return req.socket.remoteAddress;
		}
		return "0.0.0.0";
	}

	// UAParserを取得する
	private static getUserAgentParser(req: Request): UAParser {
		const userAgent = new UAParser(req.headers["user-agent"]);
		return userAgent;
	}
}

export default Utility;