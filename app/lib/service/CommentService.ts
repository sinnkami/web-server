import { IInsertCommentReuest } from "../definitions/routers/blog";
import Comment from "../database/Comment";
import ErrorService, { ErrorCode } from "./ErrorService";
import { IComment } from "../definitions/database/Comment";
import EntryComment from "../database/EntryComment";

class CommentService {

	public static async insertComment(req: IInsertCommentReuest): Promise<IComment> {
		const entryId = req.entryId;
		if (!entryId) throw ErrorService.getError(ErrorCode.NotSelectedEntryId);

		const author = req.author;
		const content = req.content;
		const ip = req.ip;
		const userAgent = req.userAgent;

		const comment = await Comment.insertComment(author, content, ip, userAgent);
		// TODO: ErrorServiceへ移動
		if (!comment) throw new Error("コメントが送信できませんでした");

		await EntryComment.insertComment(entryId, comment.commentId);

		return comment;
	}

}

export default CommentService;