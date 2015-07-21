/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getHotels: function(req, res) {
		Hotel.find({
			country: req.param("name")
		})
		.exec(function(error, result) {
			return res.send(result);
		});
	},


	getHotel: function(req, res) {
		Hotel.findOne({
			id: req.param("id")
		})
		.exec(function(error, result) {
			return res.send(result);
		});
	},


	postHottel: function(req, res) {
		if (req.body.name && req.body.description) {
			Hotel.create({
				name: req.body.name, 
				country: req.param("name"), 
				description: req.body.description
			})
			.exec(function(error, result) {
				return res.send(result);
			});
		}
		else {
			res.status(400);
			res.send("Yu shuld enter parameter 'name' and 'description'");
		}
	},


	 putHottel: function(req, res) {
		var hotelObj = {};
			if (req.body.name) {
				hotelObj.name = req.body.name;
			}
			if (req.body.description) {
				hotelObj.description = req.body.description;
			}
			Hotel.update({id: req.param("id")}, hotelObj)
			.exec(function(error, result) {
				return res.send(result);
			});
	},

	deleteHotel: function(req, res) {
		Hotel.findOne({
			id: req.param("id")
		})
		.exec(function(error, result) {
			if (result) {
				Hotel.destroy({
					id: req.param("id")
				})
				.exec(function(error, result) {
					return res.send("Hotel id = " + req.param("id") + " deleted");
				});
			}
			else {
				res.status(404);
				res.send(result);
			}
		});
	}
};

