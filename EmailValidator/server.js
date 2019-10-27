var express = require('express')
var path = require('path')
var nodemailer = require('nodemailer');
var app = express()
var port = 3000
var setToken;
var fromEmail = "Your Email";
//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aaa@abc.com', //email Id 
      pass: 'Password' //password 
    }
  });
  
  function sendMail(mailOptions , cb) {
    transporter.sendMail(mailOptions, cb);
  }
  
app.post('/forgot',(req,res)=>{
    console.log(req.body);
    setToken = "123ghasfsd"; // Generate random String
    var mailvalues = {
        "from": fromEmail,
        "to": req.body.email,
        "subject": "Test Link",
        "text": `Open this link to validate http://${req.headers.host}/validate/${setToken}\n\n`
      };
      sendMail(mailvalues ,  function (error, info) {
        if (error) {
          console.log(error);
          res.send("Error!");
          
        } else {
          console.log('Email sent: ' + info.response);
          res.send("An e-mail has been sent");
          
        }
       
      })
})

//validate URL
app.get('/validate/:token',(req,res)=>{
    let token = req.params.token;
    if(token == setToken){
        res.send("Email Validate")
    }else{
        res.send("Something Went Wrong")
    }
})


app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})