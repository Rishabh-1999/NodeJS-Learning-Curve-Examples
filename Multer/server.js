var express = require('express')
var multer  = require('multer')
var path = require('path')
var app = express()
var port = 3000

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 



function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']
    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")
    if(isAllowedExt && isAllowedMimeType){
        return cb(null ,true) // no errors
    }
    else{
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!')
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ file.fieldname+'.'+file.originalname.split('.')[1].toLowerCase())
    }
  })
   
  var upload = multer({ storage: storage ,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).single('profilePic')


app.post('/upload',(req,res)=>{
    upload(req, res, (err) => {
        if (err){ 
            res.send({ 'msg': err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                res.send('No file selected!')
            
            }
            else{
                res.send('File uploaded successfully!')
            }
        }
    
    })

})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})
app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})