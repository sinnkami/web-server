import moment from "moment";
import cheerio from "cheerio";
import config from "config";

import Category from "../../database/Category";
import Comment from "../../database/Comment";

import { ICategory } from "../../definitions/database/Category";
import { IEntries } from "../../definitions/database/Entries";
import { IComment } from "../../definitions/database/Comment";

export interface IEntryOptions {
	addMoreTag?: boolean;
	dateFormat?: string;
}

class EntryData {
	public entryId: number;
	public userId: number;
	public title: string;
	public content: string;
	public createAt: string;
	public updateAt: string;
	public category?: ICategory;
	public comments: IComment[] = [];

	public constructor(entry: IEntries) {
		this.entryId = entry.entryId;
		this.userId = entry.userId;
		this.title = entry.title;
		this.content = entry.content;
		this.createAt = entry.createAt.toISOString();
		this.updateAt = entry.updateAt.toISOString();
	}

	public async createEntry(options: IEntryOptions = {}): Promise<this> {
		// カテゴリーを設定する
		// const category = await Category.getById(this.entryId);
		// this.category = category;

		// コメントを設定する
		// const comments = await Comment.getCommentListByEntryId(this.entryId);
		// this.comments = comments;

		// 時間を変換する
		const dateFormat = options.dateFormat || config.get("dateFormat");
		this.createAt = moment(this.createAt).format(dateFormat);
		this.updateAt = moment(this.updateAt).format(dateFormat);

		// 「続きを読む」が存在するかどうか
		this.content = options.addMoreTag ? await this.addMoreTag(this.entryId, this.content) : this.content;

		return this;
	}

	// 「続きを読む」を追加する
	private async addMoreTag(entryId: number, body: string): Promise<string> {
		const $ = cheerio.load(`${body}`);
		const $contents = $("body");
		const readMoreContents = $contents
			.children()
			.eq(4)
			.nextAll();
		readMoreContents.remove();
		if (readMoreContents.length > 0) {
			$contents.append(`<a href="/blog/entry/${entryId}">続きを読む</a>`);
		}

		return $contents.html() || "";
	}
}

export default EntryData;
