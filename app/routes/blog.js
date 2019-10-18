const express = require('express');
const router = express.Router();

const cheerio = require('cheerio');
require('date-utils');

const EntriesMaster = require('../lib/database/EntriesMaster');
const CommentMaster = require('../lib/database/CommentMaster');
const CategoryMaster = require('../lib/database/CategoryMaster');
const entriesMaster = new EntriesMaster();
const commentMaster = new CommentMaster();
const categoryMaster = new CategoryMaster();


// 一覧の記事数
const LIMIT = 10;


// 記事一覧を表示する
router.get('/', function(req, res, next) {
    const page = Number(req.query.page) || 1;
    Promise.all([
        entriesMaster.getEntriyCount(),
        entriesMaster.getEntryListByLimitCount((page - 1) * LIMIT, LIMIT),
    ]).then(function([count, values]) {
        if (!values.length) { return next("NotFound"); }
        const promise = [];
        values.forEach(function(value) {
            promise.push(contentsConversion(value, true));
        });
        Promise.all(promise).then(function(contents) {
            res.render("main/blog", { contents: contents, currentPage: page,  maxPage: Math.ceil(count / 10) });
        });
    }).catch(function(err) {
        console.log(err);
        next("NotFound");
    });
});

// 記事を表示する
router.get('/entry/:id(\\d+)', function(req, res, next) {
    Promise.all([
        entriesMaster.getById(Number(req.params.id)),
        entriesMaster.getNextEntry(Number(req.params.id)),
        entriesMaster.getBackEntry(Number(req.params.id)),
        commentMaster.getCommentListByEntryId(Number(req.params.id)),
    ]).then(function([value, next, back, comments]) {
        if (!comments.length) {
            comments.push({ body: "<p>コメントがありません</p>" });
        } else {
            for (let data of comments) { if (data.create_at) { data.create_at = new Date(value.create_at).toFormat("YYYY/MM/DD HH24時MI分"); }}
        }
        contentsConversion(value, false).then(function(contents) {
            let twitterCard;
            const imageURL = getFirstImageURL(contents.body);
            console.log(imageURL);
            if (imageURL) {
                twitterCard = {
                    card        : "summary_large_image",
                    site        : "@sinnkami_",
                    title       : contents.title,
                    url         : `htttps://sinnkami.com/blog/entry/${contents.id}`,
                    imageURL    : imageURL,
                    description : getDescriptionEntry(contents.body),
                };
            }
            res.locals.entryID = Number(req.params.id);
            console.log(twitterCard);
            res.render("main/blog", {
                contents: [contents],
                next: next ? next.id : "",
                back: back ? back.id : "",
                comments: comments.length ? comments : comments,
                twitterCard: twitterCard,
            });
        });
    }).catch(function(err) {
        console.log(err);
        next("NotFound");
    });
});

// カテゴリ一覧を表示する
router.get('/category', function(req, res, next) {
    Promise.resolve(categoryMaster.get()).then(function(categorys) {
        const lists = categorys.reduce((v, current) => {
            if (v.indexOf(current.name) === -1) { v.push(current.name); }
            return v;
        }, []);
        res.render("main/lists", { listTitle: "カテゴリ一覧", href: "category", lists: lists });
    }).catch(function(err) {
        console.log(err);
        next("NotFound");
    });
});

// カテゴリーで記事を絞る
router.get(`/category/:name`, function(req, res, next) {
    const page = Number(req.query.page) || 1;
    Promise.resolve(categoryMaster.getByName(req.params.name))
        .then((categoryList) => {
            const entriIdList = categoryList.map((v) => v.entryId);

            Promise.all([
                entriesMaster.getEntriyCountByIds(entriIdList),
                entriesMaster.getByIds(entriIdList),
            ]).then(function([count, entries]) {
                const promise = [];
                entries.forEach(function(entry) {
                    promise.push(contentsConversion(entry, true));
                });
                Promise.all(promise).then(function(contents) {
                    res.render("main/blog", { contents: contents, currentPage: page,  maxPage: Math.ceil(count / 10) });
                });
            }).catch(function(err) {
                console.log(err);
                next("NotFound");
            });
        });
});

router.post('/comment', function(req, res, next) {
    const data = req.body;
    if (!Object.keys(data).length || !res.locals.entryID) { res.status(400).send("データが存在していない"); return; }
    data.entryID = res.locals.entryID;
    data.ip = getIp(req);
    data.device = req.headers["user-agent"];
    commentMaster.insertComment(data).then(function(result) {
        res.status(200).json(result);
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

// 取得したデータを表示できるように変換する関数
function contentsConversion(value, more = false) {
    return new Promise(function(resolve, reject) {
        Promise.all([categoryMaster.getById(value.id)]).then(function([category]) {
            console.log("category: ", category);
            // カテゴリーを設定する
            value.category = category.name;

            // 時間を変換する
            value.create_at = new Date(value.create_at).toFormat("YYYY/MM/DD HH24時MI分");
            value.update_at = new Date(value.update_at).toFormat("YYYY/MM/DD HH24時MI分");

            // 「続きを読む」が存在するかどうか
            value.body = more ? moreHtml(value.body, value.id) : value.body;

            return resolve(value);
        }).catch(function(error) {
            return reject(error);
        });
    });
}

// 記事に「続きを読む」を追加する
function moreHtml(body, entryID) {
    const $ = cheerio.load(`<div id="contents">${body}</div>`);
    const $contents = $("div#contents");
    const readMoreContents = $contents.children().eq(4).nextAll();
    readMoreContents.remove();
    if (readMoreContents.length > 0) {
        $contents.append(`<a href="/blog/entry/${entryID}">続きを読む</a>`);
    }

    return $.html();
}

function getIp(req) {
    if (req.headers['x-forwarded-for']) { return req.headers['x-forwarded-for']; }
    if (req.connection && req.connection.remoteAddress) { return req.connection.remoteAddress; }
    if (req.connection.socket && req.connection.socket.remoteAddress) { return req.connection.socket.remoteAddress; }
    if (req.socket && req.socket.remoteAddress) { return req.socket.remoteAddress; }
    return '0.0.0.0';
}

function getFirstImageURL(body) {
    const $ = cheerio.load(`${body}`);
    return $("img").first().attr("src");
}

function getDescriptionEntry(body) {
    const $ = cheerio.load(`${body}`);
    return $.text().substring(0, 100);
}

module.exports = router;
