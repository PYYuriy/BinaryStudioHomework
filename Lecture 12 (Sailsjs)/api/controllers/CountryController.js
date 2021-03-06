/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getCountries: function(req, res) {
		Country.find().exec(function(error, result) {
			return res.send(result);
		});
	},

	postCountry: function(req, res) {
		if (req.body.name && req.body.description) {
			Country.create({
				name: req.body.name,
				description: req.body.description
			})
			.exec(function(error, result) {
				return res.send(result);
			});
		}
		else {
			res.status(400);
			res.send("Yu shuld enter not less than 'name' and 'description'");
		}
	}
};

