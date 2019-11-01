var express = require('express') // load express
var app = express() 
var port = 3000

//Request Parser 
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).


//Serve html file
app.get('/',function(req,res){
    res.sendFile(__dirname +'/index.html');
})

// Get Method
app.get('/getURL',function(req,res){
    res.send({'name':'John' , 'age' : 21});
})

//Post Method 
app.post('/postURL',function(req,res){
    console.log(req.body)
    res.send(req.body);
})

app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})