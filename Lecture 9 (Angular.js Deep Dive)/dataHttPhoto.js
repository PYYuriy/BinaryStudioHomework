(function(){

angular
	.module('myApp')
	.factory("dataHttPhoto",dataHttPhoto);

	function dataHttPhoto ($http){
		var urlBase = 'http://jsonplaceholder.typicode.com/photos';

		dataHttPhoto.getPhoto = function () {
				return $http.get(urlBase);
		};
	return dataHttPhoto;
}

})();
