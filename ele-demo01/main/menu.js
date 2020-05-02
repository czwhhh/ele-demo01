//这是个主进程
//引入主进程的BrowserWindow
const {Menu,BrowserWindow} = require('electron')

var template = [
    {
        label : "一往情深",
        submenu : [
            {
                label : '精品SPA',
                accelerator : 'ctrl + n',//为菜单按钮绑定快捷键
                click : ()=>{   //为菜单按钮添加点击事件
                    //跳转到一个新窗口，新的内容
                    var newWin = new BrowserWindow({
                        width : 500,
                        heght : 500,
                        webPreferences:{
                            nodeIntegration:true
                        }
                    })
                    newWin.loadFile('yellow.html')
                    newWin.on('closed',()=>{
                        newWin = null
                    })
                }
            },
            {
                label : '泰式按摩'
            }
        ]
    },{
        label : "猛男俱乐部",
        submenu : [
            {
                label : "爱情啪啪啪",
            },
            {
                label : "玫瑰牛奶浴"
            }
        ]
    }
]
//用来构建模板
var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)