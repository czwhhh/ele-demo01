//这是个渲染进程

const btn = this.document.querySelector('#btn')

//用remote来引入主进程的BrowserWindow
const BrowserWindow = require('electron').remote.BrowserWindow

window.onload = function(){
    btn.onclick = ()=>{
        newWin = new BrowserWindow({
            width : 800 ,
            height : 800
        })
        newWin.loadFile('yellow.html')
        newWin.on('closed',()=>{
            newWin = null
        })
    }
}

var {remote} = require('electron')
//右键菜单栏的模板
var rightTemplate = [
    {
        label : '复制',
        accelerator : 'ctrl + c'
    },
    {
        label : '粘贴',
        accelerator : 'ctrl + v'
    }
]

//构建模板  这个变量m 写啥都行
//该渲染进程要使用主进程的Menu
var m = remote.Menu.buildFromTemplate(rightTemplate)
window.addEventListener('contextmenu',(e)=>{
    e.preventDefault()//阻止默认的点击事件
    //
    m.popup({window:remote.getCurrentWindow()})
})