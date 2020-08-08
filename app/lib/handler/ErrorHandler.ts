/*============================================================================*/
/* ■ ErrorHandler
/*----------------------------------------------------------------------------*/
/*  エラーが飛んで来たときにエラー番号によって送るデータを設定するハンドラ
/*============================================================================*/

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ErrorService from "../service/ErrorService";

class ErrorHandler {
	public static process(callback: ErrorRequestHandler): ErrorRequestHandler {
		return (code: number, req: Request, res: Response, next: NextFunction): ErrorRequestHandler => {
			// TODO: 本番環境になる前にエラーログの出力を止める
			return callback(ErrorService.getHttpException(code), req, res, next);
		};
	}


}

export default ErrorHandler;
