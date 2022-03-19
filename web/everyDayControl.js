const everyDayDao = require("../dao/everyDayDao")
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil")
var path = new Map();



function editEveryDay(req, res) {
    req.on("data", function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil(), function (result) {
            res.writeHead(200)
            var ru = respUtil.writeResult("success", "添加成功", null)
            res.write(
                ru
            )
            res.end()
        })
    })
}
path.set("/editEveryDay", editEveryDay);




function queryEveryDay(req, res) {
    everyDayDao.queryEveryDay(function (result) {
        res.writeHead(200)
        var ru = respUtil.writeResult("success", "添加成功", result)
        res.write(
            ru
        )
        res.end()
    })
}
path.set("/queryEveryDay", queryEveryDay);



module.exports.path = path;