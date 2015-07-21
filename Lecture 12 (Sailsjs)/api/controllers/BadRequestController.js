/**
 * BadRequestController
 *
 * @description :: Server-side logic for managing Badrequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	Bad: function(req, res) {
		res.badRequest("ERROR Message");
	},
	errorTemp: function(req, res) {
		res.status(400);
		res.view("errorTemp", {message: "ERROR"});
	}
};

