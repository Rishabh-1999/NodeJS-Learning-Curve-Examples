var express = require('express')
var path = require('path')
var ejs = require('ejs')
var app = express()
var port = 3000

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 

// view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.get('/users',(req,res)=>{
    res.render('users')
})

app.get('/usersDynamic',(req,res)=>{
    res.render('dynamicUsers',{"data": [
        {"name":"Ram" , "age":21} , {"name":"Mohan" , "age": 24} ,
     {"name":"Sandeep" , "age":24} , {"name":"Deep" , "age":23} , {"name":"Jack" , "age": 27} ]})
})

app.get('/partials',(req,res)=>{
    res.render('usePartial')
})
app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})