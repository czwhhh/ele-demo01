var fs = require('fs')  //引入node里的一个fs

window.onload = function(){
    //获取两个dom元素
    var btn = this.document.querySelector('#btn')
    var app = this.document.querySelector('#app')

    btn.onclick = function(){
        fs.readFile('people.txt',(error,data)=>{
            app.innerHTML = data
        })
    }
}
