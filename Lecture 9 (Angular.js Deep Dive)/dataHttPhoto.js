(function(){

angular
	.module('myApp')
	.factory("dataHttPhoto",dataHttPhoto);

	function dataHttPhoto ($http){
	var urlBase = 'http://jsonplaceholder.typicode.com/photos';
		dataHttPhoto.getPhoto = function () {
				return $http.get(urlBase).success(function(response){
								return response;
						}).error(function (error) {
								return console.log('Unable to load customer data: ' + error);
						});
					
		};
	return dataHttPhoto;
}

})();

