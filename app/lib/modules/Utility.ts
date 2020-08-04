import { Request } from "express";

class Utility {
	// 文字列なtrue/falseをboolean型へ変換する
	public static toBoolean(text: string): boolean {
		return text.toLowerCase() === "true";
	}

	// ドメインを取得する
	public static getDomain(req: Request) {
		return req.protocol + '://' + req.get('Host');
	}
}

export default Utility;