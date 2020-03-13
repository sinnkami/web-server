import path from "path";

const dirName = __dirname.replace(/config/g, "");
console.log(dirName);

const config = {
	locals: {},
	title: "otouhu-blog",
	overview: "豆腐って美味しいよね",
	descriptions: "豆腐（とうふ）は、大豆の搾り汁（豆乳）を凝固剤（にがり、その他）によって固めた加工食品である。",
	port: 3000,
	view: {
		path: path.join(dirName, "views"),
		engine: "pug",
	},
	favicon: {
		use: false,
		path: path.join(dirName, "public", "favicon.ico"),
	},

	logger: {
		configure: {
			appenders: {
				console: {
					type: "console",
					layout: {
						type: "pattern",
						pattern: "[%[%p%]] [%d{yyyy/MM/dd-hh:mm:ss}]%n%m",
					},
				},
				accsessLogFile: {
					type: "dateFile",
					filename: "logs/access.log",
					pattern: "-yyyy-MM-dd",
					layout: {
						type: "pattern",
						pattern: "[%p] [%d{yyyy/MM/dd-hh:mm:ss}]%n%m",
					},
				},
				errorLogFile: {
					type: "dateFile",
					filename: "logs/error.log",
					pattern: "_yyyy-MM-dd",
					layout: {
						type: "pattern",
						pattern: "[%p] [%d{yyyy/MM/dd-hh:mm:ss}]%n%m",
					},
				},
				accsess: {
					type: "logLevelFilter",
					appender: "accsessLogFile",
					level: "info",
				},
				error: {
					type: "logLevelFilter",
					appender: "errorLogFile",
					level: "error",
				},
				system: {
					type: "logLevelFilter",
					appender: "console",
					level: "all",
				},
			},
			categories: {
				default: {
					appenders: ["system", "accsess", "error"],
					level: "all",
				},
			},
			replaceConsole: true,
		},
		connectLoggerOptions: {
			level: "all",
			statusRules: [
				{ from: 200, to: 399, level: "info" },
				{ from: 400, to: 499, level: "warn" },
				{ from: 500, to: 599, level: "error" },
			],
			format: ":method :status :url :response-timems\n接続元IP: :remote-addr",
		},
	},

	session: {
		secret: "secret",
		cookie: {
			secure: true, //httpsの場合はtrue
			maxAge: null,
		},
	},

	publicFolderPath: path.join(dirName, "public"),
	useNodeModulePathList: [
		path.join(dirName, "node_modules", "jquery", "dist"),
		path.join(dirName, "node_modules", "slicknav", "dist"),
		path.join(dirName, "node_modules", "quill", "dist"),
	],

	db: {
		type: "mysql",
		host: "localhost",
		user: "root",
		password: "",
		name: "sinnkami-web",
		connectionLimit: 10,
	},

	maxCategory: 5,
	menu: null,
	systemMenu: null,
	imageServerURL: null,
};

const locals = {
	title: config.title,
	overview: config.overview,
	descriptions: config.descriptions,
};
config.locals = locals;

exports = config;
