const db = require('./DButil');


//查询总数
function queryBlogCount(success) {
    var sql = "select count(1) as count from blog;";
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

//通过id查询博客
function queryBlogById(blogId, success) {
    var sql = "select * from blog where id = ?;";
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

//插入博客数据
function insertBlog(title, content, tags, views, ctime, utime, success) {
    var sql = "insert into blog (`title` , `content` , `tags` , `views` , `ctime` , `utime`) values (?,?,?,?,?,?);";
    var params = [title, content, tags, views, ctime, utime]

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


//查询博客数据
function queryBlogs(page = 1, pageSize = 5, success) {
    console.log("查询博客page|pageSize————————————", page, pageSize)
    var sql = "select * from blog order by id desc limit ?,?;";
    var params = [(page * pageSize), pageSize]

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


//queryAllBlog
function queryAllBlog(success) {
    var sql = "select * from blog;";
    var params = [];
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

//addViews
function addViews(id, success) {
    var sql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
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


//
function queryHotBlog(size, success) {
    var sql = "select * from blog order by views desc limit ?;";
    var params = [size];
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
    insertBlog,
    queryBlogs,
    queryBlogCount,
    queryBlogById,
    queryAllBlog,
    addViews,
    queryHotBlog
}