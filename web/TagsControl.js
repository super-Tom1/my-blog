const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const TagsDao = require("../dao/TagsDao")
const Mapping = require("../dao/TagBlogMappingDao")
const url = require("url")
var path = new Map();



function queryRandomTags(req, res) {
    TagsDao.queryAllTags(function (result) {

        result.sort(() => {
            return Math.random() > 0.5 ? true : false;
        })

        // console.log(result)

        res.writeHead(200)
        var ru = respUtil.writeResult("success", "添加成功", result)
        res.write(
            ru
        )
        res.end()
    })
}
path.set("/queryRandomTags", queryRandomTags);

function queryByTag(req, resp) {
    var params = req.parse(req.url, true).query;

    Mapping.queryByTag(parseInt(params.tag))
}
path.set("/queryByTag", queryByTag);

function queryByTagCount() {

}
path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;