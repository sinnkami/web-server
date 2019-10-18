const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const config = require('config');

const requireDir = require('require-dir');
const routers = requireDir("./routes", { recurse: true });

const logger = require('logger');
const isDevice = require('isDevice');
const errorHander = require('error-handler');

const CategoryMaster = require('./lib/database/CategoryMaster');
const EntriesMaster = require('./lib/database/EntriesMaster');

const categoryMaster = new CategoryMaster();
const entriesMaster = new EntriesMaster();

require('./lib/tasks');

const app = express();

// view engine setup
const viewFolderPath = config.get("view.path");
const viewEngine = config.get("view.engine");
app.set('views', viewFolderPath);
app.set('view engine', viewEngine);
app.locals.basedir = app.get('views');

// uncomment after placing your favicon in /public
if (config.has("favicon.use") && config.get("favicon.use")) {
    const faviconPath = config.get("favicon.path");
    app.use(favicon(faviconPath));
}

if (config.has("logger") && config.get("logger")) {
    app.use(logger(':color(5;1)[:date]:color(0)'));
    app.use(logger(':method :status :url :color(6):response-ms-time ms:color(0)'));
    app.use(logger('接続元IP :: :ip'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionSecret = config.get("session.secret");
const sessionCookieConfig = config.get("session.cookie");
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: sessionCookieConfig.secure,
        maxage: sessionCookieConfig.maxage,
    },
}));

const publicFolderPath = config.get("publicFolderPath");

app.use(express.static(publicFolderPath));
if (config.has("useNodeModulePathList")) {
    const useNodeModulePath = config.get("useNodeModulePathList");
    if (Array.isArray(useNodeModulePath)) {
        const moduleList = [];
        for (const modulePath of useNodeModulePath) {
            moduleList.push(express.static(modulePath));
        }
        app.use('/module', moduleList);
    } else {
        console.warn("'useNodeModulePath' is not an array");
    }
}

// 全ページ共通処理
app.use(function(req, res, next) {
    Promise.all([categoryMaster.get(), entriesMaster.getEntryListByLimitCount(1, 5)]).then(function([categorys, entries]) {

        Object.assign(res.locals, config.get("locals"));

        // デバイス情報を設定する
        res.locals.device = isDevice(req);

        // 最新の記事を設定する
        const contents = [];
        entries.forEach(function(value) { contents.push({ title: value.title, id: value.id }); });
        res.locals.latestContents = contents;

        // カテゴリー一覧を設定する
        const maxCategory = config.get("maxCategory") || 5;
        const categoryList = categorys
            .sort((a, b) => b.id - a.id )
            .reduce((v, current, index, array) => {
                if (v.indexOf(current.name) === -1) { v.push(current.name); }
                if (v.length >= maxCategory) { array.splice(1); }
                return v;
            }, []);
        res.locals.categoryList = categoryList;

        next();
    });
});

// 再帰的にrouterを読み込む
function routerUse(url, routers) {
    for (let [name, router] of Object.entries(routers)) {
        if (typeof router === "object") { return routerUse(url + name + "/", router); }
        if (name === "index") { name = ""; }
        app.use(url + name, router);
    }
}
routerUse("/", routers);

// catch 404 and forward to error handler
app.use(function(req, res, next) { return next("NotFound"); });

// error handler
app.use(errorHander(function(error, req, res, next) {
    res.status(error.status || 500);
    res.render('error', {
        errorTitle: error.title,
        errorMessage: error.message,
        errorStatus: error.status,
        error: error,
    });
}));

module.exports = app;
