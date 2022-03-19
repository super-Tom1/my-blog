var db = require("./DButil")



function insertTag(tag, ctime, utime, success) {
    var sql = "insert into tags (`tag`, `ctime`, `utime`) values (?,?,?);";
    var params = [tag, ctime, utime]

    var connection = db.createConnection();
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

function queryTag(tag, success) {
    var sql = "select * from tags where tag = ?;";
    var params = [tag]

    var connection = db.createConnection();
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


function queryAllTags(success) {
    var sql = "select * from tags ;";
    var params = []

    var connection = db.createConnection();
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



module.exports = {
    insertTag,
    queryTag,
    queryAllTags
}