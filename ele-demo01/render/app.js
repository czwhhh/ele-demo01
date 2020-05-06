
window.onload = function(){
    this.console.log("该页面加载的同时创建数据库连接并且开启一个服务器...")
    /**
     * 在app.js中引入express并实例化express对象
     * 在app.js中引入mysql
     */
    const express = require("express");
    const app = express();
    const mysql = require("mysql");

    //创建连接
    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"nodeMySQL"   //如果已经存在数据库，直接写在这
    })
    //开启一个服务器
    app.listen(3333,()=>{
        console.log("服务器开启在3333端口....");
    })

    //使用db.connect()方法连接，这个方法接受一个参数，有错误就报错
    db.connect((err)=>{
        if(err){
            throw err;
        }
        console.log("连接成功");
    })

    /**
     * 创建数据库
     * 在一个路由里写sql语句 使用db.query来执行sql语句 db.query()方法有两个参数 ,
     * 第一个参数是要执行的语句 第二个参数是个回调函数 回调函数里可以接收错误信息,
     * 也有执行后回来的信息 依然是错误优先
     */
    app.get("/createdb",(req,res)=>{
        let sql = "CREATE DATABASE nodemysql";
        db.query(sql,(err,result)=>{
            if(err){
                res.send("该数据库已经存在...")
                console.log(err);
            }else{
                console.log(result);
                res.send("Datebase create success...")
            }
        })
    })

    /**
     * 创建表
     * 也是在一个路由里写sql语句
     */
    app.get("/createpoststable",(req,res)=>{
        //创建表 表名为posts id 自增 title字符串长度255 body字符串255 主键是ID
        let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))";
        //使用db.query()方法执行sql语句
        db.query(sql,(err,result)=>{
            if(err){
                this.console.log(err);
            }else{
                this.console.log(result);
                res.send("posts表创建成功...")
            }
        })
    })

    /**
     * 往数据库这个表里插入内容
     */
    app.get("/addpost1",(req,res)=>{
        //创建一个对象
        let post = {title : "post one" ,body:"easth"};
        let sql = "INSERT INTO posts SET ?";
        db.query(sql,post,(err,result)=>{
            if(err){
                this.console.log(err);
            }else{
                this.console.log(result)
                res.send("post1 added....")
            }
        })
    })
    /**
     * 查询内容
     */
    app.get("/getposts",(req,res)=>{
        let sql = "SELECT * FROM posts";
        db.query(sql,(err,result)=>{
            if(err){
                this.console.log(err);
            }else{
                this.console.log(result);
                // res.send("查询成功")
                res.json(result)  //将查询的内容返回到应用界面
            }
        })
    })

    /**
     * 查询单个内容
     */
    app.get("/queryById/:id",(req,res)=>{
        this.console.log(req.params.id)
        let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
        // let sql = 'SELECT * FROM posts WHERE id = '+req.params.id;
        db.query(sql,(err,result)=>{
            if(err){
                this.console.log(err);
            }else{
                this.console.log(result);
                res.send(result[0].body) ;
                // res.json(result);
            }
        })
    })
    /**
     * 更新内容get方式
     * post方式需要使用一个第三方的包 ：body-parser 要用的时候上网查
     */
    app.get("/updateTable",(req,res)=>{
        //从表单获得表单传来的一个对象
        var params = req.query;
        // this.console.log(params)
        let sql = `UPDATE posts SET title = '${params.title}',body = '${params.body}' WHERE id = ${params.id}`;
        db.query(sql,(err,result)=>{
            if(err){
                this.console.log(err);
            }else{
                this.console.log(result);
                res.send(`update ${params.id} success....`)
            }
        })
    })

}


//创建一个数据库
var childBtn = document.querySelector('#childBtn')
childBtn.onclick = ()=>{
    window.open('http://localhost:3333/createdb')
}
//点击按钮创建一个表
var createTable = document.querySelector('#createTable')
createTable.onclick = ()=>{
    window.open('http://localhost:3333/createpoststable')
}
//插入内容
var insertContent = document.querySelector('#insertContent')
insertContent.onclick = ()=>{
    window.open('http://localhost:3333/addpost1')
}
//查询表中所有内容
var queryContents = document.querySelector('#queryContents')
queryContents.onclick = ()=>{
    window.open('http://localhost:3333/getposts')
}
//通过id查找内容
var queryById = document.querySelector('#queryById')
var ID = document.querySelector('#ID')
queryById.onclick = ()=>{
    var id = ID.value;
    window.open(`http://localhost:3333/queryById/${id}`)
}
