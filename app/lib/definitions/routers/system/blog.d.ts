export interface IUpdateEntryRequest {
	entryId?: number;
	categoryId?: number;
	title: string;
	content: string;

	// MEMO: booleanで渡したいがこちらに来る時に、文字列になってしまう
	post: string;
}