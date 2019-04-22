var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');

app.post("/putInCart", function (request, response) {
	addToFileCart(request, function() {
		response.end();
	})
})

function addToFileCart(request, callback) {
	var newData = [];
	console.log(request.responseText)

	var body = '';
	 	request.on('data', function(chunk) {
			body += chunk;
		});

	var obj=[];

	request.on('end', function() {
			console.log(body)
			var temp = JSON.parse(body);
			obj=temp;
		});

	var path="./manage/cart"+obj[0].ownerName+".txt";
	var flag=0;

	try {
  		if (fs.existsSync(path)) {
    	flag=1;
  		
	} catch(err) {
  			console.error(err)
  		}

  		if(flag==0)
  		{
  			var createStream = fs.createWriteStream(path);
			createStream.end();
  		}

	fs.readFile(path,  function(error, oldData) {
		if(error) {
			throw error;
		}
		if(oldData.toString())
			newData = JSON.parse(oldData);

		request.on('end', function() {
			console.log(body)

			var data = JSON.parse(body);
			fs.truncate(path,0,function()
			{
				console.log('deleted');
			});
			newData.push(data[0]);
			fs.writeFile(path, JSON.stringify(newData), function (error) {
				if(error) {
					throw error;
				}
			});
		});
	});
}

app.post("/currAcc", function (request, response) {
	addToFileCurrAcc(request, function() {
		response.end();
	})
})

function addToFileCurrAcc(request, callback) {
	var newData = [];
	console.log(request.responseText)
	fs.readFile("./manage/currAcc.txt",  function(error, oldData) {
		if(error) {
			throw error;
		}
		if(oldData.toString())
			newData = JSON.parse(oldData);
		var body = '';
	 	request.on('data', function(chunk) {
			body += chunk;
		});
		request.on('end', function() {
			console.log(body)
			var data = JSON.parse(body);
			fs.truncate('./manage/currAcc.txt',0,function()
			{
				console.log('deleted');
			});
			newData.push(data[0]);
			fs.writeFile("./manage/currAcc.txt", JSON.stringify(newData), function (error) {
				if(error) {
					throw error;
				}
			});
		});
	});
}

app.post("/productDetails", function (request, response) {
	addToFileproductDetails(request, function() {
		response.end();
	})
})

function addToFileproductDetails(request, callback) {
	var newData = [];
	console.log(request.responseText)
	fs.readFile("./manage/productDetails.txt",  function(error, oldData) {
		if(error) {
			throw error;
		}
		if(oldData.toString())
			newData = JSON.parse(oldData);
		var body = '';
	 	request.on('data', function(chunk) {
			body += chunk;
		});

		request.on('end', function() {
			console.log(body)

			var data = JSON.parse(body);
			newData.push(data[0]);
			fs.writeFile("./manage/productDetails.txt", JSON.stringify(newData), function (error) {
				if(error) {
					throw error;
				}
			});
		});
	});
}

app.get("/currAcc", function (request, response) {
fs.readFile('./manage/currAcc.txt', function(error, contents) 
  {
    if (error) 
      throw error;

    var tasks;
    if (contents.length === 0) 
      tasks = [];
    else 
      tasks = JSON.parse(contents);
    login=tasks;
    console.log(tasks);
    	response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
  });
})

app.get("/login", function (request, response) {
fs.readFile('./manage/login.txt', function(error, contents) 
  {
    if (error) 
      throw error;

    var tasks;
    if (contents.length === 0) 
      tasks = [];
    else 
      tasks = JSON.parse(contents);
    login=tasks;
    console.log(tasks);
    	response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
  });
})

app.get("/productDetails", function (request, response) {
fs.readFile('./manage/productDetails.txt', function(error, contents) 
  {
    if (error) 
      throw error;

    var tasks;
    if (contents.length === 0) 
      tasks = [];
    else 
      tasks = JSON.parse(contents);
    login=tasks;
    console.log(tasks);
    	response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
  });
})

app.get("/login", function (request, response) {
fs.readFile('./manage/currAcc.txt', function(error, contents) 
  {
    if (error) 
      throw error;

    var tasks;
    if (contents.length === 0) 
      tasks = [];
    else 
      tasks = JSON.parse(contents);
    login=tasks;
    console.log(tasks);
    	response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
  });
})

app.use(express.static('manage'));
app.listen(3000);
console.log("Running on localhost")


