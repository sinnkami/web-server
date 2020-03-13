export interface IComment {
	id: number;
	entryId: number;
	author: string;
	body: string;
	create_at: Date;
	ip: string;
	device: string;
}
