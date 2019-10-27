var express = require('express')
var path = require('path')
var app = express()
var port = 3000
const bcrypt = require('bcrypt-nodejs');

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 


app.post('/gettabledata',function (req, res) {
  console.log(req.body);
  // console.log(req.body.order[0].column);
  /*var count;
  
  if(req.body.order[0].column==0)
  {
    if(req.body.order[0].dir=="asc")
    getdata("username",1);
    else
    getdata("username",-1);
  }
  else if(req.body.order[0].column==1)
  {
    if(req.body.order[0].dir=="asc")
    getdata("phoneNo",1);
    else
    getdata("phoneNo",-1);
  }
  else if(req.body.order[0].column==2)
  {
    if(req.body.order[0].dir=="asc")
    getdata("city",1);
    else
    getdata("city",-1);
  }
  else if(req.body.order[0].column==3)
  {
    if(req.body.order[0].dir=="asc")
    getdata("status",1);
    else
    getdata("status",-1);
  }
  else if(req.body.order[0].column==4)
  {
    if(req.body.order[0].dir=="asc")
    getdata("userType",1);
    else
    getdata("userType",-1);
  }
  
  else {
    getdata("username",1);
  }*/
  
  getdata("username",1);
  function getdata(colname,sortorder)
  {
    var start=parseInt(req.body.start);
    var len=parseInt(req.body.length);
  
    /*  login.countDocuments(function(e,count){
  
  
        var role=req.body.role;
        var status=req.body.status;
        var search=req.body.search.value;
        var getcount=10;
  
      var findobj={};
        // console.log(role,status);
        if(role!="All")
           { findobj.userType=role;}
        else{
            delete findobj["userType"];
        }
        if(status!="All")
            {findobj.status=status;}
        else{
            delete findobj["status"];
        }
        if(search!='')
            findobj["$or"]= [{
            "username":  { '$regex' : search, '$options' : 'i' }
        }, {
            "phoneNo":{ '$regex' : search, '$options' : 'i' }
        },{
            "city": { '$regex' : search, '$options' : 'i' }
        }
        ,{
            "status":  { '$regex' : search, '$options' : 'i' }
        }
        ,{
            "userType": { '$regex' : search, '$options' : 'i' }
        }]
        else{
            delete findobj["$or"];
        }
  
  
        login.find(findobj).countDocuments(function(e,coun){
        //console.log(coun);
        getcount=coun;
      }).catch(err => {
        console.error(err)
        res.send(error)
      })
  */
  
  
  var data=[{'username' : 'hello' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '0' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '1' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '2' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '3' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '4' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '5' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '6' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '7' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '8' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '9' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '10' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '11' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '12' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '13' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '14' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '15' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '16' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '17' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '18' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '19' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '20' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '21' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'},
  {'username' : '22' ,'phoneNo' : '1234567890' , 'city' : 'pta' , 'status' : 'confirmed' , 'userType' : 'user'} ];
  
  
      //  login.find(findobj)
       data = data.slice(start,start+len);
    //  console.log(data1);
  
    res.send({"recordsTotal" : 24,"recordsFiltered" :24 , data})
  
  }
  
  })
  
app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})
