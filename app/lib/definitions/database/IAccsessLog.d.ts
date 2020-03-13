export interface IAccsessLog {
	id: number;
	method: string;
	status: number;
	url: string;
	response_time: number;
	ip: string;
	user_agent: string;
	create_at: Date;
}
