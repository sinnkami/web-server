class HttpException extends Error {
	public status!: number;
	public title!: string;
	public message!: string;

	constructor(error?: string) {
		super(error);
	}
}

export default HttpException;
