	(function(){

	angular
	.module('myApp')
	.factory("dataResourceFhoto",dataResourceFhoto);
	function dataResourceFhoto ($resource){
		var urlBase = 'http://jsonplaceholder.typicode.com/photos/:id';

		dataResourceFhoto.getPhoto = function () {
				return $resource(
				urlBase,
				{id: "@id"},
				{
						 "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
				});
		};
	return dataResourceFhoto;
}

})();