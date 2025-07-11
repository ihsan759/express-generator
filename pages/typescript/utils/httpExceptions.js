const Content = `
export abstract class CustomError<T = string[]> extends Error {
	abstract readonly statusCode: number;
	abstract readonly errors: T;
	abstract readonly isLogging: boolean;
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, CustomError.prototype);
	}
}

export class HttpException extends CustomError<string[]> {
	readonly _statusCode: number;
	readonly _isLogging: boolean;
	constructor(
		statusCode = 500,
		message = 'Something went wrong',
		isLogging = false
	) {
		super(message);
		this._statusCode = statusCode;
		this._isLogging = isLogging;
		Object.setPrototypeOf(this, HttpException.prototype);
	}
	get errors() {
		return [this.message];
	}
	get statusCode() {
		return this._statusCode;
	}
	get isLogging() {
		return this._isLogging;
	}
}

export class HttpValidationExceptions extends CustomError<
	{ [key: string]: string }[]
> {
	readonly _statusCode = 400;
	readonly _isLogging: boolean;
	readonly _errors: { [key: string]: string }[];
	constructor(
		errors: { [key: string]: string }[] = [{ error: 'Bad Request' }],
		isLogging = false
	) {
		super('Bad Request');
		this._errors = errors;
		this._isLogging = isLogging;
		Object.setPrototypeOf(this, HttpValidationExceptions.prototype);
	}
	get errors() {
		return this._errors;
	}
	get statusCode() {
		return this._statusCode;
	}
	get isLogging() {
		return this._isLogging;
	}
}
`.trimStart();

export default Content;
