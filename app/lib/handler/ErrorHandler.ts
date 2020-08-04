/*============================================================================*/
/* ■ ErrorHandler
/*----------------------------------------------------------------------------*/
/*  エラーが飛んで来たときにエラー番号によって送るデータを設定するハンドラ
/*============================================================================*/

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import HttpException from "../class/Exception/HttpException";
import ErrorService from "../service/ErrorService";

class ErrorHandler {
	public static process(callback: ErrorRequestHandler): ErrorRequestHandler {
		return (code: number, req: Request, res: Response, next: NextFunction): ErrorRequestHandler => {
			// set locals, only providing error in development
			const errorContent = req.app.get("env") === "development" ? ErrorService.getHttpException(code) : {};
			return callback(errorContent, req, res, next);
		};
	}


}

export default ErrorHandler;
