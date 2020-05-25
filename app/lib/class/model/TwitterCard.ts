import cheerio from "cheerio";

import EntryData from "./EntryData";

export interface ITwitterCard {
	card: string;
	site: string;
	title: string;
	url: string;
	image?: string;
	description?: string;
}

class TwitterCard implements ITwitterCard {
	public card: string;
	public site: string;
	public title: string;
	public url: string;
	public image?: string;
	public description?: string;

	public constructor(data: ITwitterCard) {
		this.card = data.card;
		this.site = data.site;
		this.title = data.title;
		this.url = data.url;
	}

	public async createTwitterCard(entry: EntryData): Promise<this> {
		this.image = await this.getFirstImageSrc(entry.content);
		this.description = await this.createDescription(entry.content);
		return this;
	}

	private async getFirstImageSrc(content: string): Promise<string> {
		const $ = cheerio.load(`${content}`);
		return (
			$("img")
				.first()
				.attr("src") || ""
		);
	}

	private async createDescription(body: string): Promise<string> {
		const $ = cheerio.load(`${body}`);
		return $("body")
			.text()
			.substring(0, 100);
	}
}

export default TwitterCard;
