import express, { Request, Response } from "express";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

process.env.NODE_CONFIG_DIR = __dirname + "/config/";
import config from "config";

import requireDir from "require-dir";
const routers = requireDir("./routes", { recurse: true });

import log4js from "./lib/modules/log4js";
const logger = log4js.getLogger();

import isDevice from "./lib/modules/isDevice";

import ErrorHandler from "./lib/handler/ErrorHandler";

import Category from "./lib/database/Category";
import Entries from "./lib/database/Entries";
import HttpException from "./lib/class/Exception/HttpException";

// MEMO: 捕捉されなかったPromise内の例外を表示する
process.on("unhandledRejection", logger.trace);

import Tasks from "./lib/modules/tasks";
const taskMessages: string[] = ["自動実行タスク一覧"];
for (const taskName of Object.keys(Tasks.jobList)) {
	taskMessages.push("・" + taskName);
}
taskMessages.push("------------------------------------");
logger.debug(taskMessages.join("\n"));

const app = express();

// view engine setup
const viewFolderPath = config.get("view.path");
const viewEngine = config.get("view.engine");
app.set("views", viewFolderPath);
app.set("view engine", viewEngine);
app.locals.basedir = app.get("views");

// uncomment after placing your favicon in /public
if (config.has("favicon.use") && config.get("favicon.use")) {
	const faviconPath: string = config.get("favicon.path");
	app.use(favicon(faviconPath));
}

if (config.has("logger") && config.get("logger")) {
	const options: object = config.get("logger.connectLoggerOptions");
	app.use(log4js.connectLogger(logger, options));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionSecret: string = config.get("session.secret");
const sessionCookieConfig: {
	secure: boolean;
	maxAge: number;
} = config.get("session.cookie");
app.use(
	session({
		secret: sessionSecret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			sameSite: "lax",
			httpOnly: true,
			secure: sessionCookieConfig.secure,
			maxAge: sessionCookieConfig.maxAge,
		},
	})
);

const publicFolderPath: string = config.get("publicFolderPath");

app.use(express.static(publicFolderPath));
if (config.has("useNodeModulePathList")) {
	const useNodeModulePath = config.get("useNodeModulePathList");
	if (Array.isArray(useNodeModulePath)) {
		const moduleList = [];
		for (const modulePath of useNodeModulePath) {
			moduleList.push(express.static(modulePath));
		}
		app.use("/module", moduleList);
	} else {
		logger.warn("'useNodeModulePath' is not an array");
	}
}

// 全ページ共通処理
app.use(function(req, res, next) {
	Promise.all([Category.get(), Entries.getEntryListByLimitCount(1, 5)]).then(function([categorys, entries]) {
		Object.assign(res.locals, config.get("locals"));

		const descriptions = res.locals.descriptions;
		if (Array.isArray(descriptions)) {
			res.locals.descriptions = descriptions.join("\n");
		} else if (!descriptions) {
			res.locals.descriptions = "";
		}

		const menu = res.locals.menu;
		if (!menu || !Array.isArray(menu)) {
			res.locals.menu = [];
		}

		const systemMenu = res.locals.systemMenu;
		if (!systemMenu || !Array.isArray(systemMenu)) {
			res.locals.systemMenu = [];
		}

		// デバイス情報を設定する
		res.locals.device = isDevice(req);

		// 最新の記事を設定する
		const contents: { title: string; id: number }[] = [];
		entries.forEach(function(value) {
			contents.push({ title: value.title, id: value.id });
		});
		res.locals.latestContents = contents;

		// カテゴリー一覧を設定する
		const maxCategory: number = config.get("maxCategory") || 5;
		const categoryList = categorys
			.sort((a, b) => b.id - a.id)
			.reduce((v: string[], current, index, array) => {
				if (v.indexOf(current.name) === -1) {
					v.push(current.name);
				}
				if (v.length >= maxCategory) {
					array.splice(1);
				}
				return v;
			}, []);
		res.locals.categoryList = categoryList;

		next();
	});
});

// 再帰的にrouterを読み込む
function routerUse(url: string, routers: object): string | void {
	for (const [name, router] of Object.entries(routers)) {
		if (typeof router === "object") {
			return routerUse(url + name + "/", router);
		}

		const routerUrl = name !== "index" ? url + name : url + "";
		app.use(routerUrl, router);
	}
}
routerUse("/", routers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	return next("NotFound");
});

// error handler
app.use(
	ErrorHandler.process(function(error: HttpException, req: Request, res: Response) {
		res.status(error.status || 500);
		res.render("error", {
			errorTitle: error.title,
			errorMessage: error.message,
			errorStatus: error.status,
			error: error,
		});
	})
);

export default app;
