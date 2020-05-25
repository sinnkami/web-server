export interface IComment {
	commentID: number;
	entryID: number;
	author: string;
	content: string;
	createAt: Date;
	ip: string;
	device: string;
}
