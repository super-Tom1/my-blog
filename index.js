var express = require("express");
var gc = require("./config")
var loader = require("./loader")

var app = new express();

app.use(express.static("./page/"));

//编辑每日一句
app.post("/editEveryDay", loader.get("/editEveryDay"));


//请求每日一句
app.get("/queryEveryDay", loader.get("/queryEveryDay"))


//编辑博客
app.post("/editBlog", loader.get("/editBlog"))
//请求博客
app.get("/queryBlogsByPage", loader.get("/queryBlogsByPage"))

//请求博客数量
app.get("/queryBlogCount", loader.get("/queryBlogCount"))
//通过ID查blog
app.get("/queryBlogById", loader.get("/queryBlogById"))
//通过ID求count
app.get("/queryCommentsCountByBlogId", loader.get("/queryCommentsCountByBlogId"))

//标签云，点击跳转
app.get("/queryByTag", loader.get("/queryByTag"))



//上传评论
app.get("/addComment", loader.get("/addComment"))
//请求验证码
app.get("/queryRandomCode", loader.get("/queryRandomCode"))
//queryCommentsByBlogId
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"))



//queryAllBlog
app.get("/queryAllBlog", loader.get("/queryAllBlog"))


//queryRandomTags
app.get("/queryRandomTags", loader.get("/queryRandomTags"))

//queryHotBlog
app.get("/queryHotBlog", loader.get("/queryHotBlog"))

//queryComments - 最近评论
app.get("/queryComments", loader.get("/queryComments"))

//标签云,跳转
app.get("/queryByTag", loader.get("/queryByTag"))
app.get("/queryByTagCount", loader.get("/queryByTagCount"))

console.log("Port: ", gc.port)
app.listen(gc.port, function () {
    console.log("启动")
})

