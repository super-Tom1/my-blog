const path = require('path')
var fs = require("fs");
const { join } = require('path');
var globalConfig = {};
var a = "d:/Projects/VsCodeProjects/myWeb/Vue/my-blog/my-blog/serve.conf"
var conf = fs.readFileSync(a);
var configArr = conf.toString().split("\n")




for (let i = 0; i < configArr.length; i++) {
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}
// console.log(globalConfig)

module.exports = globalConfig;