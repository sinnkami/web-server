import HttpException from "../class/Exception/HttpException";

class ErrorService {
	public static getHttpException(code: number): HttpException {
		const error = new HttpException(code);
		// TODO: enum型に設定する
		switch (code) {
			// 400番台
			case HttpStatus.BadRequest:
				error.status = HttpStatus.BadRequest;
				error.title = "不正なリクエストです";
				error.message = "";
				return error;
			case HttpStatus.Unauthorized:
				error.status = HttpStatus.Unauthorized;
				error.title = "許可されていない行為です";
				error.message = "権限を所持していません。";
				return error;
			case HttpStatus.NotFound:
				error.status = HttpStatus.NotFound;
				error.title = "そのようなページは存在しません";
				error.message = "URLが間違っているか、対象のページが削除された可能性があります。";
				return error;

			// 500番台
			case HttpStatus.InternalServerError:
				error.status = HttpStatus.InternalServerError;
				error.title = "サーバーでエラーが発生しました";
				error.message = "管理者へお問い合わせ下さい";
				return error;
			case HttpStatus.NotImplemented:
				error.status = HttpStatus.NotImplemented;
				error.title = "未実装です。";
				error.message = "実装まで今しばらくお待ちください。";
				return error;

			default:
				return error;
		}
	}

	public static getError(code: number): Error {
		const error = new Error();
		switch (code) {
			case ErrorCode.FailedToPostEntry:
				error.name = "記事の投稿に失敗しました。";
			case ErrorCode.FailedToUpdateEntry:
				error.name = "記事の更新に失敗しました。";
			case ErrorCode.NotSelectedEntryId:
				error.name = "記事IDが指定されていない為、処理できませんでした。";
		}
		return error;
	}
}

export enum HttpStatus {
	BadRequest = 400,
	Unauthorized = 401,
	NotFound = 404,

	InternalServerError = 500,
	NotImplemented = 501,
}

export enum ErrorCode {
	FailedToPostEntry = 601,
	FailedToUpdateEntry = 602,
	NotSelectedEntryId = 610,
}

export default ErrorService;