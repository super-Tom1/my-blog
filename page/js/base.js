var randomTags = new Vue({
    el: "#randomTags",
    data() {
        return {
            tags: [],
        };
    },
    computed: {
        randomColor() {
            return function () {
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomFontsize() {
            return function () {
                var num = parseInt(Math.random() * 50);
                return num + "px"
            }
        }
    },
    methods: {
        getTags() {
            axios({
                method: "get",
                url: "/queryRandomTags"
            }).then((result) => {
                let arr = []
                for (let i = 0; i < result.data.data.length; i++) {
                    var temp = {};
                    temp.tag = result.data.data[i].tag;
                    temp.id = result.data.data[i].id;
                    arr.push(temp)
                }
                randomTags.tags = arr;
            }).catch((err) => {

            });
        },
        queryBlogByTag(){
            
            axios({
                
            })
        },
        
    },
    created() {
        this.getTags()
    }
})


var newHot = new Vue({
    el: "#new_hot",
    data() {
        return {
            titleList: []
        }
    },
    methods: {
        getHotBlog() {
            console.log("发送tags请求")
            axios({
                method: "get",
                url: "/queryHotBlog"
            }).then((result) => {
                var result = result.data.data;
                console.log(result)
                var arr = [];
                for (let i = 0; i < result.length; i++) {
                    var temp = {};
                    temp.title = result[i].title;
                    temp.link = `/blog_detail.html?bid=` + result[i].id
                    arr.push(temp)
                }
                // console.log(arr)
                newHot.titleList = arr;

            }).catch((err) => {

            });
        }
    },
    created() {
        this.getHotBlog()
    }
})

var newComments = new Vue({
    el: "#new_comments",
    data() {
        return {
            commentList: [

            ]
        }
    },
    methods: {
        getNewCom() {
            axios({
                method: "get",
                url: "/queryComments"
            }).then((result) => {
                var result = result.data.data;
                console.log(result)
                var arr = [];
                for (let i = 0; i < result.length; i++) {
                    var temp = {};
                    temp.name = result[i].user_name;
                    temp.date = this.formatDate(result[i].ctime);
                    temp.comment = result[i].comments;
                    arr.push(temp)
                }
                console.log(arr)
                newComments.commentList = arr;
            }).catch((err) => {

            });
        },
        //时间戳10位
        formatDate: function (time) {//时间戳转日期
            let date = new Date(parseInt(time) * 1000);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            return y + '-' + MM + '-' + d;
        }

    },
    created() {
        this.getNewCom()
    }
})













