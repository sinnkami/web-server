export interface IAccsessLog {
	id: number;
	method: string;
	status: number;
	url: string;
	responseTime: number;
	ip: string;
	userAgent: string;
	createAt: Date;
}
