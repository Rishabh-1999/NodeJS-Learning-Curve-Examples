var express = require('express');
var fs = require('fs');
var app = express();


app.delete("/deleteData", function (request, response) {
	deleteFromData(request, function() {
		response.end();
	})
})

function deleteFromData(request, callback) {
	var newData = [];
	console.log(request.responseText)
	fs.readFile("./todo/todo.txt",  function(error, oldData) {
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


			for(var i=0;i<newData.length;i++)
			{
				console.log(newData[i].data);
				console.log('-');
				console.log(data.data);
				if(newData[i].data==data.data)
				{
					newData.splice(i,1)
					console.log('deleted');
				}
			}


			fs.writeFile("./todo/todo.txt", JSON.stringify(newData), function (error) {
				if(error) {
					throw error;
				}
			});
		});
	});
}

app.post("/putData", function (request, response) {
	addToFileLogin(request, function() {
		response.end();
	})
})

function addToFileLogin(request, callback) {
	var newData = [];
	console.log(request.responseText)
	fs.readFile("./todo/todo.txt",  function(error, oldData) {
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
			fs.writeFile("./todo/todo.txt", JSON.stringify(newData), function (error) {
				if(error) {
					throw error;
				}
			});
		});
	});
}

app.get("/getData", function (request, response) {
fs.readFile('./todo/todo.txt', function(error, contents) 
  {
    if (error) 
      throw error;

    var datalist=[];

      datalist = JSON.parse(contents);
    	response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(datalist));
        response.end();
  });
})

app.use(express.static('todo'));
app.listen(3000);
console.log("Running on localhost")


