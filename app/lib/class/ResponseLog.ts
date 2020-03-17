/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import stripAnsi from "strip-ansi";
import path from "path";

import LinuxColor from "./LinuxColor";
import { Level } from "log4js";

class ResponseLog {
	private logEvent!: any;

	public init(logEvent: any): void {
		this.logEvent = logEvent;
	}

	public text(deleteAnsi: boolean): string {
		const messages = deleteAnsi ? stripAnsi(this.create()) : this.create();
		return messages;
	}

	public create(): string {
		const logEvent = this.logEvent;

		const levelColor = this.getAnsiLevelColor(logEvent.level);
		const level = levelColor + logEvent.level.levelStr + LinuxColor.default();
		const date = LinuxColor.lightBlue() + this.getDate() + LinuxColor.default();

		let fileName = logEvent.fileName;
		const fileList = fileName.split(path.sep);
		// TODO: 定数化
		if (fileList.length > 2) {
			fileName = fileList.slice(-2).join(path.sep);
		}

		const messages: string[] = [];
		messages.push(`[${level}] [${date}] [${LinuxColor.gray() + fileName + LinuxColor.default()}]`);

		if (!logEvent.context.res) {
			const logEventMessageList = logEvent.data.map((value: any) => {
				if (typeof value === "object") return JSON.stringify(value);
				return value;
			});
			return messages.concat(logEventMessageList).join("\n");
		}
		const res = logEvent.context.res;
		const req = logEvent.context.res.req;

		let statusCodeColor = "";
		if (Number(this.getStatusCode(res)) >= 500) {
			statusCodeColor = LinuxColor.red();
		} else if (Number(this.getStatusCode(res)) >= 400) {
			statusCodeColor = LinuxColor.yellow();
		} else if (Number(this.getStatusCode(res)) >= 300) {
			statusCodeColor = LinuxColor.cyan();
		} else if (Number(this.getStatusCode(res)) >= 200) {
			statusCodeColor = LinuxColor.green();
		} else {
			statusCodeColor = LinuxColor.default();
		}

		const method = this.getMethod(req);
		const statusCode = statusCodeColor + this.getStatusCode(res) + LinuxColor.default();
		const url = this.getUrl(req);
		const responseTime = LinuxColor.purple() + this.getResponseMsTime(res) + " ms" + LinuxColor.default();

		messages.push(`${method} ${statusCode} ${url} ${responseTime}`);

		const ip = this.getIp(req);
		messages.push(`接続元IP: ${ip}`);

		return messages.join("\n");
	}

	private getAnsiLevelColor(level: Level): string {
		switch (level.levelStr) {
			case "TRACE":
				return LinuxColor.blue();
			case "DEBUG":
				return LinuxColor.cyan();
			case "INFO":
				return LinuxColor.green();
			case "WARN":
				return LinuxColor.brown();
			case "ERROR":
				return LinuxColor.red();
			case "FATAL":
				return LinuxColor.purple();
		}

		return "";
	}

	private getIp(req: any): string {
		if (req.connection && req.connection.remoteAddress) {
			return req.connection.remoteAddress;
		}
		if (req.socket && req.socket.remoteAddress) {
			return req.socket.remoteAddress;
		}
		return "0.0.0.0";
	}

	private getResponseMsTime(res: any): string {
		return res.responseTime;
	}

	private getStatusCode(res: any): string {
		return res.statusCode ? res.statusCode.toString() : "";
	}
	private getUrl(req: any): string {
		return req.originalUrl || req.url;
	}

	private getMethod(req: any): string {
		return req.method;
	}

	private getDate(): string {
		return moment().format("YYYY/MM/DD-HH:mm:ss");
	}
}

export default new ResponseLog();
