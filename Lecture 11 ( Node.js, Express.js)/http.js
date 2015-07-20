var http = require("http");
var urlparse = require("url");
var fs = require("fs");

http.createServer(serverConfiguration).listen(8888);
console.log("Server started, on port 8888");
function readData(path) {
	return JSON.parse(fs.readFileSync(path));
}
function writeData(path, data) {
	fs.writeFileSync(path, JSON.stringify(data));
}
function hotelManipulation(method, id, insertObj) {
	var path = __dirname + "/hotels.json";
	var data = readData(path)
	var creatElement = {
		status: "error"
	};

	switch (method) {
		case "GET":
			var item = {};
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == id) {
					item = data[i];
					break;
				}
			}
			creatElement = {
				data: item,
				status: "geted"
			};
			break;
		case "PUT":
			var item = {};
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == id) {
					item = data[i];
					break;
				}
			}
			if (!item.id) {
				creatElement = {
					message: "Hotel " + id + " not found"
				};
				break;
			}
			if (insertObj.name) {
				item.name = insertObj.name;
			}
			if (insertObj.description) {
				item.description = insertObj.description;
			}
			writeData(path, data);
			creatElement = {
				status: "updated",
				id: item.id, 
				name: item.name,
				name: item.name,
				description: item.description
			};
			break;
		case "DELETE":
			var item = {};
			creatElement = {
				status: "error",
				message: "Hotel with this " + id + " not found"
			};
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == id) {
					item = data[i];
					data.splice(data.indexOf(item), 1);
					writeData(path, data)
					
					creatElement = {
						id: item.id, 
						name: item.name,
						description: item.description,
						status: "deleted"
					};
					break;
				}
			}
			break;
	}

	return creatElement;
}
function countryManipulation(method, insertObj) {
	var path = __dirname + "/countries.json";
	var data = readData(path)
	var creatElement = {
		status: "error"
	};

	switch (method) {
		case "GET":
			creatElement = {
				data: data,
				status: "ok",
			};
			break;
		case "POST":

			var item = {
				"name": insertObj.name,
				"description": insertObj.description
			};
			for (var i = 0; i < data.length; i++) {
				if (data[i].name == item.name) {
					creatElement = {
						status: "error",
						message: item.name + " exist"
					};
					break;
				}
			}
			if (creatElement.message) break;
			data.push(item);
			writeData(path, data)
			creatElement = {
				id: item.id,
				name: item.name,
				description: item.description,
				status: "Added"
			};
			break;
	}

	return creatElement;
}
function countryHotels(method, name, insertObj) {
	var path = __dirname + "/hotels.json";
	var data = readData(path)
	var creatElement = {
		status: "error"
	};

	switch (method) {
		case "GET":
			var country_data = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].country == name) {
					country_data.push(data[i]);
				}
			}
			creatElement = {
				status: "ok",
				data: country_data
			};
			break;
			case "POST":
			var item = {
				"id": (data[data.length - 1].id + 1),
				"name": insertObj.name,
				"country": name,
				"description": insertObj.description
			};
			data.push(item);
			writeData(path, data);
			creatElement = {
				id: item.id,
				name: item.name,
				description: item.description,
				status: "Added"

			};
			break;
	}

	return creatElement;
}

function resaultInfo(method, urlPathName, body) {
	var insertObj, creatElement = {};
	var api, table, recId, subtable, inf;
	var argArray = urlPathName.split("/");
	var argLength = argArray.length;

	function informationTarget() {
		if (api == "api") {
			if (table == "countries") {
				if (argLength == 3) {
					return "countries";
				}
				else if ((subtable == "hotels") && (argLength == 5)) {
					return "country hotels";
				}
			}
			else if ((table == "hotels") && (argLength == 4)) {
				return "hotel";
			}
		}
		else {
			return "";
		}
	}

	if (!argArray[argLength - 1]) {
		argLength--;
	}

	if (argLength < 6) {
		api = argArray[1];
		table = argArray[2];
		recId = argArray[3];
		subtable = argArray[4];
	}

	inf = informationTarget();

	if (!inf) {
		creatElement.message = "Cannot " + method;
		return creatElement;
	}
	else if (method == "POST" || method == "PUT") {
		try {
			insertObj = JSON.parse(body);
		}
		catch (e) {
			insertObj = {};
		}
	}

	switch (inf) {
		case "countries":
			creatElement = countryManipulation(method, insertObj);
			break;
		case "country hotels":
			creatElement = countryHotels(method, recId, insertObj);
			break;
		case "hotel":
			creatElement = hotelManipulation(method, recId, insertObj);
	}

	if (creatElement.status == "error" && !creatElement.message) {
		creatElement.message = "Cannot " + method + " " + urlPathName;
	}

	return creatElement;
}
function serverConfiguration(req, res) {
	var body = "";

	req.on("data", function(chunk) {
		body += chunk.toString();
	});

	req.on("end", function() {
		var url = urlparse.parse(req.url, true);
		var creatElement = resaultInfo(req.method, url.pathname, body);
		var outputStr = JSON.stringify(creatElement);
		var bufLen = Buffer.byteLength(outputStr, "utf8");

		res.writeHead(200, {
			"Connection": "close",
			"Content-Type": "application/json; charset=utf-8",
			"Content-Length": bufLen
		});
		res.end(outputStr);
	});
}