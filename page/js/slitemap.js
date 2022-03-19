var blogList = new Vue({
    el:"#blog_list",
    data() {
        return {
            blogList: [],
        };
    },
    computed: {
        
    },
    created () {

        console.log("___")
        axios({
            method:"get",
            url:"/queryAllBlog"
        }).then((result) => {
            console.log(result.data.data)
            var arr = result.data.data
            for (let i = 0; i < arr.length; i++) {
                console.log("1111")
                result.data.data[i].link = `/blog_detail.html?bid=${result.data.data[i].id}`
            }
            blogList.blogList = result.data.data
        }).catch((err) => {
            console.log(err)
        });
    }
})