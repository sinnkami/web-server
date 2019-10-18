const path = require('path');

const dirName = __dirname.replace(/config/g, '');
console.log(dirName);

const config = {
    title: "新神の仮想空間",
    overview: "なんか色々やっていき",
    port: 3000,
    view: {
        path: path.join(dirName, 'views'),
        engine: "pug",
    },
    favicon: {
        use: false,
        path: path.join(dirName, 'public', 'favicon.ico'),
    },

    logger: true,

    session: {
        secret: "secret",
        cookie: {
            secure: true, //httpsの場合はtrue
            maxage: null,
        },
    },

    publicFolderPath: path.join(dirName, 'public'),
    useNodeModulePathList: [
        path.join(dirName, 'node_modules', 'jquery', 'dist'),
        path.join(dirName, 'node_modules', 'slicknav', 'dist'),
        path.join(dirName, 'node_modules', 'quill', 'dist'),
    ],

    db: {
        type: "mysql",
        host: "localhost",
        user: "root",
        password: "",
        name: "sinnkami-web",
        connectionLimit: 10,
    },
};

const locals = {
    title: config.title,
    overview: config.overview,
};
config.locals = locals;

module.exports = config;
