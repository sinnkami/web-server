import express, { Request, Response, CookieOptions, Router } from "express";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

import passport from "passport";
import { Strategy } from "passport-local";

process.env.NODE_CONFIG_DIR = __dirname + "/config/";
import config from "config";

import requireDir from "require-dir";

import log4js from "./lib/modules/log4js";
const logger = log4js.getLogger();

import isDevice from "./lib/modules/isDevice";

import ErrorHandler from "./lib/handler/ErrorHandler";
const handlerList = requireDir("./lib/handler/beforeHandler");

const routers = requireDir("./routes", { recurse: true });

import HttpException from "./lib/class/Exception/HttpException";

// MEMO: 捕捉されなかったPromise内の例外を表示する
process.on("unhandledRejection", logger.trace);

import Tasks from "./lib/modules/tasks";
import { IConnectLoggerOption } from "./lib/definitions/module/log4js";

import login from "./lib/modules/login";

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

if (config.has("modules.log4js") && config.get("modules.log4js")) {
	const options: IConnectLoggerOption = config.get("modules.log4js.connectLoggerOptions");
	app.use(log4js.connectLogger(logger, options));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionSecret: string = config.get("modules.session.secret");
const sessionCookieConfig: CookieOptions = config.get("modules.session.cookie");
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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
	new Strategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true,
		},
		function(req, username, password, done) {
			login(username, password).then(function(result) {
				logger.info("ログインに成功しました");
				return done(null, username);
			}).catch(function(err) {
				logger.error(err);
				return done(null, false, { message: "パスワードが正しくありません。" });
			});
		}
	)
);

const publicFolderPath: string = config.get("public.path");

app.use(express.static(publicFolderPath));
if (config.has("public.useNodeModules")) {
	const useNodeModulePath = config.get("public.useNodeModules");
	if (Array.isArray(useNodeModulePath)) {
		const moduleList = [];
		for (const modulePath of useNodeModulePath) {
			moduleList.push(express.static(modulePath));
		}
		app.use("/module", moduleList);
	} else {
		logger.warn("'useNodeModules' is not an array");
	}
}

// 全ページ共通処理
app.use(function(req, res, next) {
	Object.assign(res.locals, config.get("locals"));

	const descriptions = res.locals.descriptions;
	if (Array.isArray(descriptions)) {
		res.locals.descriptions = descriptions.join("\n");
	}
	// デバイス情報を設定する
	res.locals.device = isDevice(req);
	next();
});

// 全ページ共通処理を読み込む
for (const handler of Object.values(handlerList)) {
	app.use(handler.process());
}

app.all("/system*", (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return next(404);
	}
});

// 再帰的にrouterを読み込む
interface IRecursiveRouter {
	[path: string]: Router | IRecursiveRouter;
}
function routerUse(url: string, routers: IRecursiveRouter): string | void {
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
app.use((req, res, next) => next(404));

// error handler
app.use(
	ErrorHandler.process(function(error: HttpException, req: Request, res: Response) {
		res.status(error.status || 500);
		res.render("pages/error", {
			errorTitle: error.title,
			errorMessage: error.message,
			errorStatus: error.status,
			error: error,
		});
	})
);

export default app;
