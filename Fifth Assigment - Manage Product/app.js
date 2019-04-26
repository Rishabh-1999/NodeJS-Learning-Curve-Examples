var express = require('express')
var path = require('path') 
var app = express()

//Acces static files
app.use(express.static(path.join(__dirname, 'manage')));

//Bodyparser
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

//Connect with db
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/myDB';

mongoose.connect(mongoDB);

mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
});

var manageProduct = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productDesc: String,
    productOty: Number
  })

  var product =  mongoose.model('manageProduct', manageProduct);

  // Add in db
app.post('/addToProduct',function (req, res) {
    console.log(req.body);
    let newProduct = new product({
      productName: req.body.name,
      productPrice: req.body.price,
      productDesc: req.body.desc,
      productOty: req.body.Qty
    })
    newProduct.save()
     .then(data => {
       console.log(data)
       res.send(data)
     })
     .catch(err => {
       console.error(err)
       res.send(error)
     })
  })
  
  //Get from DB
  app.get('/getProductData',function(req,res){
      product.find({
           // search query
           //productName: 'mlbTvrndc'  
      })
      .then(data => {
          console.log(data)
          res.send(data)
        })
        .catch(err => {
          console.error(err)
          res.send(error)
        })
  })

  app.post('/updateProduct',function(req,res){
    console.log(req.body);
    product.findOneAndUpdate(
    {
        productName: req.body.pname  // search query
    }, 
    {
      productName: req.body.newname   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.post('/deleteproduct',function(req,res){
    console.log(req.body);
    product.findOneAndDelete({productName: req.body.name})
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})
console.log("Running on port 3000");
app.listen(3000)