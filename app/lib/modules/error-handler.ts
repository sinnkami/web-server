/*============================================================================*/
/* ■ error-handler
/*----------------------------------------------------------------------------*/
/*  エラーが飛んで来たときにエラー番号によって送るデータを設定する自作ライブラリ
/*============================================================================*/

import { Request, Response, NextFunction } from "express";
import HttpException from "../class/Exception/HttpException";

export default function(callback: Function) {
	return function(error: string, req: Request, res: Response, next: NextFunction): Function {
		// set locals, only providing error in development
		const errorContent = req.app.get("env") === "development" ? errorContents(error) : {};
		return callback(errorContent, req, res, next);
	};
}

function errorContents(data: string): HttpException {
	const error = new HttpException();
	switch (data) {
		// 400番台
		case "Bad Request":
			error.status = 400;
			error.title = "不正なリクエストです";
			error.message = "";
			return error;
			break;
		case "Unauthorized":
			error.status = 401;
			error.title = "許可されていない行為です";
			error.message = "権限を所持していません。";
			return error;
			break;
		case "NotFound":
			error.status = 404;
			error.title = "そのようなページは存在しません";
			error.message = "URLが間違っているか、対象のページが削除された可能性があります。";
			return error;
			break;

		// 500番台
		case "NotImplemented":
			error.status = 501;
			error.title = "未実装です。";
			error.message = "実装まで今しばらくお待ちください。";
			return error;
			break;
		default:
			return error;
	}
}
