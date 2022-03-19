var vue = new Vue({
    el: "#every_day",
    data: {
        content: "每日一句哈哈哈哈哈哈"
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        //请求数据；
        axios({
            method: "get",
            url: "/queryEveryDay",

        }).then(resp => {
            this.content = resp.data.data[0].content;
        }).catch(err => {
            console.log("失败", err)
        })
    }
})



///博客列表
var articleList = new Vue({
    el: "#article_list",
    data: {
        articleList: [],
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
    },
    computed: {
        getPage() {
            return (page = 1, pageSize = 5) => {
                var Url = location.search.indexOf("?") > -1 ?
                    location.search.split("?")[1].split("&") : "";
                var tag = "";

                for (let i = 0; i < Url.length; i++) {
                    if (Url.split("=")[0] == "tag") {
                        try {
                            tag = parseInt(Url.split("=")[1])
                        } catch (e) {
                            throw e
                        }
                    }
                }

                if (tag != "") {

                } else {
                    axios({
                        url: `/queryBlogsByPage?page=${page - 1}&pageSize=${pageSize}`,
                        method: "get",

                    }).then(resp => {
                        let result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp)
                        }

                        articleList.articleList = list;
                        articleList.page = page
                    }).catch(resp => {
                        console.log("出错", resp)
                    })
                     
                    axios({
                        url: "/queryBlogCount",
                        method: "get",
                    }).then((resp) => {

                        articleList.count = resp.data.data[0].count
                        articleList.generatePageTool
                    })
                    console.log("请求后count————", this.count)
                }


            }
        },
        generatePageTool() {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({
                text: "<<",
                page: 1
            })

            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 })
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 })
            }
            result.push({ text: nowPage, page: nowPage })

            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 })
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 })
            }

            result.push({ text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize) })

            this.pageNumList = result;

            return result;

        },
        jumpTop() {
            return (page) => {

                if (typeof page !== "number") return;

                if (page < 1) return;

                if (page > Math.ceil((this.count + this.pageSize - 1) / this.pageSize)) {


                    return;
                }

                this.getPage(page, this.pageSize)
            }
        }
    },
    created() {
        this.getPage(this.page, this.pageSize)
    }

})