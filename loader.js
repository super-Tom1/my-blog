var fs = require('fs')
var globalConfig = require('./config');

var controllerSet = [];

var pathMap = new Map();

// 获取 web下所有文件
const files = fs.readdirSync("web")
console.log(files, files.length)


const len = files.length;

for (var i = 0; i < len; i++) {
    var temp = require("./" + "web" + "/" + files[i]);
    if(temp.path){
        for (const [key , value] of temp.path) {
            if(pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                throw new Error("url 错误,url"+key);
            }
            controllerSet.push(temp);
        }
    }
}

// console.log("loader: ",pathMap)

module.exports = pathMap;
