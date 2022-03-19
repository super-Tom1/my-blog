const db = require('./DButil');


function insertComment(blogId, parentName, parent, userName, email, content, ctime, utime, success) {
    var sql = "insert into comments (`blog_id`,`parent_name`, `parent`, `user_name`,`email`,`comments`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?);";
    var params = [blogId, parentName, parent, userName, email, content, ctime, utime]

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


function queryCommentsByBlogId(blogId, success) {
    var sql = "select * from comments where blog_id = ?;";
    var params = [blogId]

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

function queryCommentsCountByBlogId(bigId, success) {
    var sql = "select count(1) as count from comments where blog_id = ?;";
    var params = [bigId]

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



function queryComments(size, success) {
    var sql = "select * from comments order by id desc limit ?;";
    var params = [size]

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
    insertComment,
    queryCommentsByBlogId,
    queryCommentsCountByBlogId,
    queryComments
}