var db = require("./DButil")



function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    var sql = "insert into tag_blog_mapping (`tag_id`,`blog_id`, `ctime`, `utime`) values (?,?,?,?);";
    var params = [tagId, blogId, ctime, utime]

    var connection = db.createConnection();

    connection.connect();

    connection.query(sql, params, function (error, result) {
        console.log("添加新标签MAP————————")
        if (error == null) {
            if (typeof success === "function") {
                console.log(`${result.insertId}——是个函数`)
                success(result);
            } else {
                console.log(`${result.insertId}->调用,不是个函数`, typeof success, success)
            }
        } else {
            console.log(error)
        }

    })
    connection.end();
}


function queryByTag(tag, success) {
    var sql = "select * from tag_blog_mapping where tag = ?"
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









module.exports = {
    insertTagBlogMapping,
    queryByTag
};