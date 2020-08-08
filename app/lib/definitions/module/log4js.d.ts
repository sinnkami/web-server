/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IConnectLoggerOption {
	format?: string | ((req: any, res: any, formatter: (str: string) => string) => string) | undefined;
	level?: string | undefined;
	nolog?: any;
	statusRules?: any[] | undefined;
	context?: boolean | undefined;
}

