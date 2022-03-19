//评论模块
var sendCom = new Vue({
    el: "#send_comments",
    data() {
        return {
            imgCode: "",
            text: "",
        }
    },
    computed: {
        sendComment() {
            return () => {
                var code = document.querySelector("#comment_code").value

                if (code != this.text.toLocaleLowerCase()) {
                    alert("验证码错误")
                }


                var bid = -2;

                var reply = document.getElementById("comment_reply").value
                var parentName = document.getElementById("comment_reply_name").value
                var name = document.getElementById("comment_name").value
                var email = document.getElementById("comment_email").value
                var content = document.getElementById("comment_content").value
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + parentName,

                }).then((result) => {
                    console.log(result)
                    alert(result.data.msg)
                }).catch((err) => {
                    console.log(err)
                });
            }
        },

    },
    created() {
        this.changeCode()
    },
    methods: {
        changeCode() {
            axios({
                method: "get",
                url: "/queryRandomCode"
            }).then((result) => {
                console.log(result)
                sendCom.imgCode = result.data.data.data;
                sendCom.text = result.data.data.text;
            }).catch((err) => {
                throw err
            });
        }
    }
})


//留言模块
var blogComments = new Vue({
    el: "#blog_comments",
    data() {
        return {
            total: 0,
            comments: []
        };
    },
    computed: {
        reply() {
            return (id, name) => {
                document.querySelector("#comment_reply").value = id;
                document.querySelector("#comment_reply_name").value = name;
                location.href = "#send_comments"
            }
        }
    },
    methods: {
        getId() {
            // var UrlParams = location.search.indexOf("?") > -1
            //     ? location.search.split("?")[1].split("&") : "";
            var bid = -1;
            // UrlParams.forEach((item, i, arr) => {
            //     if (arr[i].split("=")[0] == "bid") {
            //         try {
            //             bid = parseInt(arr[i].split("=")[1])
            //         } catch (error) {
            //             console.log(error)
            //         }
            //     }
            // })
            return bid
        },
        init() {

            var bid = -2;
            console.log("BlogCommentsCreated——", bid)
            axios({
                method: "get",
                url: `/queryCommentsByBlogId?bid=${bid}`
            }).then((result) => {
                console.log("BlogCommentsCreated——", result)
                blogComments.comments = result.data.data;
                for (let i = 0; i < blogComments.comments.length; i++) {
                    if (blogComments.comments[i].parent > -1) {
                        blogComments.comments[i].options = `回复@—${blogComments.comments[i].parent_name}`
                    }

                }

            }).catch((err) => {
                console.log(err)
            });
        },
        getTotal() {
            var bid = this.getId()
            axios({
                method: "get",
                url: `/queryCommentsCountByBlogId?bid=${bid}`
            }).then((result) => {
                console.log("total——————————", result)
                blogComments.total = result.data.data[0].count
            }).catch((err) => {

            });
        }
    }
    ,
    created() {
        this.init()
        this.getTotal()
    }
})