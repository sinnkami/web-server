import moment from "moment";
import cheerio from "cheerio";

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
	public id: number;
	public author: string;
	public title: string;
	public body: string;
	public createAt: string;
	public updateAt: string;
	public category?: ICategory;
	public comments: IComment[] = [];

	public constructor(entry: IEntries) {
		this.id = entry.id;
		this.author = entry.author;
		this.title = entry.title;
		this.body = entry.body;
		this.createAt = entry.create_at.toISOString();
		this.updateAt = entry.update_at.toISOString();
	}

	public async createEntry(options: IEntryOptions = {}): Promise<this> {
		// カテゴリーを設定する
		const category = await Category.getById(this.id);
		this.category = category;

		// コメントを設定する
		const comments = await Comment.getCommentListByEntryId(this.id);
		this.comments = comments;

		// 時間を変換する
		// TODO: 定数化
		const dateFormat = options.dateFormat || "YYYY/MM/DD HH時mm分";
		this.createAt = moment(this.createAt).format(dateFormat);
		this.updateAt = moment(this.updateAt).format(dateFormat);

		// 「続きを読む」が存在するかどうか
		this.body = options.addMoreTag ? await this.addMoreTag(this.id, this.body) : this.body;

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

		console.log($contents.html());

		return $contents.html() || "";
	}
}

export default EntryData;
