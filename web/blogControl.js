const Blog = require("../dao/blogDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const TagDao = require("../dao/TagsDao")
const TagBlogMappingDao = require("../dao/TagBlogMappingDao")
var url = require("url")
var path = new Map();


//查询博客数量
function queryBlogCount(req, resp) {
    Blog.queryBlogCount((result) => {
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success", "OK", result))
        resp.end()
    })
}

//queryAllBlog
function queryAllBlog(req, resp) {
    Blog.queryAllBlog((result) => {
        resp.writeHead(200)
        resp.write(respUtil.writeResult("success", "获取成功", result))
        resp.end()
    })
}
path.set("/queryAllBlog", queryAllBlog)


//queryHotBlog
function queryHotBlog(req, resp) {
    Blog.queryHotBlog(5, (result) => {
        resp.writeHead(200)
        resp.write(respUtil.writeResult("success", "获取成功", result))
        resp.end()
    })
}
path.set("/queryHotBlog", queryHotBlog)

//编辑博客
function editBlog(req, res) {

    var params = url.parse(req.url, true).query;

    var tags = params.tags.replace(/ /g, "").replace(/(,|，)+/g, ",")


    req.on("data", function (data) {
        Blog.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            res.writeHead(200);
            res.write(respUtil.writeResult("success", "添加成功", null))
            res.end();

            let blogId = result.insertId;
            console.log('标签STR——', tags)
            let tagsList = tags.split(",");
            console.log(tagsList, "——标签集合")
            for (var i = 0; i < tagsList.length; i++) {
                if (tagsList[i] === "") {
                    continue;
                }

                queryTag(tagsList[i], blogId)

            }

        })


    })
}

//通过ID查询Blog
function queryBlogById(req, resp) {
    var params = url.parse(req.url, true).query;

    Blog.queryBlogById(params.bid, (result) => {
        resp.writeHead(200)
        resp.write(respUtil.writeResult("success", "OK", result))
        resp.end()

        console.log("id", params.bid)
        Blog.addViews(parseInt(params.bid), (result) => {
            // console.log(result)
        })
    })
}



function queryBlogsByPage(req, resp) {
    let params = url.parse(req.url, true).query;
    let page = parseInt(params.page);
    let pageSize = parseInt(params.pageSize)

    // console.log("page-pageSize:", page, pageSize, params)

    Blog.queryBlogs(page, pageSize, (result) => {

        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*>"/g,)
        }


        resp.writeHead(200)
        resp.write(respUtil.writeResult("success", "查询成功", result))
        resp.end();
    })


}
path.set("/queryBlogsByPage", queryBlogsByPage)
path.set("/queryBlogCount", queryBlogCount)
path.set("/queryBlogById", queryBlogById)
path.set("/editBlog", editBlog)


//标签
function queryTag(tag, blogId) {

    TagDao.queryTag(tag, (result) => {
        if (result == null || result.length == 0) {
            console.log("没有标签，添加标签——", typeof tag, tag, typeof blogId)

            insertTag(tag, blogId)
        } else {
            console.log("有标签——", typeof tag, tag, typeof blogId)
            console.log(result)
            TagBlogMappingDao
                .insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {
                    console.log("这是一个回调")
                })
        }
    })
}

path.set("/queryTag", queryTag)

function insertTag(tag, blogId) {


    TagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), (result) => {
        console.log("添加标签OK——ID", result.insertId)
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    console.log("map——ID: ", tagId, blogId)
    TagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), (result) => { })
}

module.exports.path = path;