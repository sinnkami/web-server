class HttpException extends Error {
	public status!: number;
	public title!: string;
	public message!: string;

	constructor() {
		super();
	}
}

export default HttpException;
