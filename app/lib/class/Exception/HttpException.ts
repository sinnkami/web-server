class HttpException extends Error {
	public status!: number;
	public title!: string;
	public message!: string;

	constructor(status: number, message?: string) {
		super(message);
		this.status = status;
		this.message = message || "";
	}
}

export default HttpException;
