
var fs = require('fs')  //引入node里的一个fs

window.onload = function(){

    this.console.log("页面正在加载...")
    //获取两个dom元素
    var btn = this.document.querySelector('#btn')
    var app = this.document.querySelector('#app')

    btn.onclick = function(){
        fs.readFile('people.txt',(error,data)=>{
            app.innerHTML = data
        })
    }
}
        
var createdb = document.querySelector('#mybtn')
//点击操作数据库按钮，打开一个新的子窗口
createdb.onclick = ()=>{
    child = window.open('./nodeMySQL.html','child')
}

