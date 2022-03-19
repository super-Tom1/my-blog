const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const commentDao = require("../dao/commentDao")
const captcha = require("svg-captcha")


const url = require("url")
let path = new Map();



function addComment(req, resp) {
    var params = url.parse(req.url, true).query;


    commentDao.insertComment(
        parseInt(params.bid),
        params.parentName,
        parseInt(params.parent),
        params.userName,
        params.email,
        params.content,
        timeUtil.getNow(),
        timeUtil.getNow(),
        function (result) {
            //回调函数
            resp.writeHead(200)
            resp.write(respUtil.writeResult("success", "OK", null))
            resp.end()
        }
    )

}
path.set("/addComment", addComment)


function queryRandomCode(req, resp) {
    let img = captcha.create({
        fontSize: 50,
        width: 100,
        height: 34,
    })

    resp.writeHead(200)
    resp.write(respUtil.writeResult("success", "OK", img))
    resp.end()
}

path.set("/queryRandomCode", queryRandomCode)

function queryCommentsByBlogId(req, resp) {
    var params = url.parse(req.url, true).query;

    commentDao.queryCommentsByBlogId(parseInt(params.bid), (result) => {
        // console.log("queryCommentsByBlogId————")
        resp.writeHead(200)
        resp.write(respUtil.writeResult("success", "获取成功", result))
        resp.end()
    })
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId)

function queryCommentsCountByBlogId(req, resp) {

    
    var params = url.parse(req.url, true).query;

    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), (result) => {
        resp.writeHead(200)
        resp.write(respUtil.writeResult("success", "获取成功", result))
        resp.end()
    })
}

path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId)









function queryComments(req, resp) {
    var params = url.parse(req.url, true).query;

    commentDao.queryComments(5, (result) => {
        resp.writeHead(200)
        resp.write(respUtil.writeResult("success", "获取成功", result))
        resp.end()
    })
}

path.set("/queryComments", queryComments)








module.exports.path = path;