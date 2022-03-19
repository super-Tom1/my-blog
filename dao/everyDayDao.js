const { query } = require("express");
const dbutil = require("./DButil");

function insertEveryDay(content, ctime, success) {
    var sql = "insert into every_day (`content`, `ctime`) values (?, ?);";
    var params = [content, ctime]

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }

    })
    connection.end();
}

function queryEveryDay(success) {
    var sql = "select * from every_day order by id desc limit 1;";
    var params = [];
    var connection = dbutil.createConnection();


    connection.connect();

    connection.query(sql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }

    })
    connection.end();
}




module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay