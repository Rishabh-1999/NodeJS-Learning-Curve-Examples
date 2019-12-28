var express = require('express')
var app = express()
var port = 3000

app.get('/',function(req,res){
    res.sendFile(__dirname +'/index.html');
})

app.get('/queryParams',function(req,res){
    console.log(req.query)
    res.send(req.query);
})

app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})