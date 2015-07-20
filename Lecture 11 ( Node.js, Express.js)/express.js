var bodyParser = require("body-parser");
var express = require("express");
var fs = require("fs");


var app = express();
var path, data, creatElement;

app.listen(8888);
console.log("Server started, on port: 8888");


app.route("/api/countries")
.all(function(req, res, next) {
	path = __dirname + "/countries.json";
	data = JSON.parse(fs.readFileSync(path));
	next();
})

.get(function(req, res, next) {
	creatElement = {
		data: data,
		status: "geted"
	};
	res.json(creatElement);
})

.post(bodyParser.json(), function(req, res, next) {
	var item = {
		"name": req.body.name,
		"description": req.body.description
	};
	for (var i = 0; i < data.length; i++) {
		if (data[i].name == item.name) {
			creatElement = {
				status: "error",
				message: item.name + " is  present"
			};
			res.json(creatElement);
			return;
		}
	}
	data.push(item);
	fs.writeFileSync(path, JSON.stringify(data));
	creatElement = {
		name: item.name,
		description: item.description,
		status: "added",

	};
	res.json(creatElement);
});


app.route("/api/countries/:name/hotels")
.all(function(req, res, next) {
	path = __dirname + "/hotels.json";
	data = JSON.parse(fs.readFileSync(path));
	next();
})

.get(function(req, res, next) {
	var country_data = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].country == req.params.name) {
			country_data.push(data[i]);
		}
	}
	creatElement = {
		data: country_data,
		status: "geted"
	};
	res.json(creatElement);
})

.post(bodyParser.json(), function(req, res, next) {
	var item = {
		"id": (data[data.length - 1].id + 1),
		"name": req.body.name,
		"country": req.params.name,
		"description": req.body.description
	};
	data.push(item);
	fs.writeFileSync(path, JSON.stringify(data));
	creatElement = {
			id: item.id, 
			name: item.name,
			description: item.description,
			status: "created"
	};
	res.json(creatElement);
});



app.route("/api/hotels/:id")
.all(function(req, res, next) {
	path = __dirname + "/hotels.json";
	data = JSON.parse(fs.readFileSync(path));
	next();
})

.get(function(req, res, next) {
	var item = {};
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == req.params.id) {
			item = data[i];
		}
	}
	creatElement = {
		data: item,
		status: "geted"
	};
	res.json(creatElement);
})

.put(bodyParser.json(), function(req, res, next) {
	var item = {};
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == req.params.id) {
			item = data[i];
		}
	}
	if (req.body.name) {
		item.name = req.body.name;
	}
	if (req.body.description) {
		item.description = req.body.description;
	}
	fs.writeFileSync(path, JSON.stringify(data));
	if (item.id) {
		creatElement = {
			id: item.id, 
			name: item.name,
			description: item.description,
			status: "updated"
		};
	}
	else {
		creatElement = {
			status: "error",
			message: "Hotel " + req.params.id + " not found"
		}
	}
	res.json(creatElement);
})

.delete(function(req, res, next) {
	var item = {};
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == req.params.id) {
			item = data[i];
			data.splice(data.indexOf(item), 1);
			fs.writeFileSync(path, JSON.stringify(data));
			creatElement = {
				id: item.id, 
				name: item.name,
				description: item.description,
				status: "deleted"
			};
		}
	}
	res.json(creatElement);
});

