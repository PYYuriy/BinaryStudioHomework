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

//*** 2-й спосіб ...чи той чи цей метод правильніший
/*(function(){

angular
	.module('myApp')
	//.factory("dataHttPhoto",dataHttPhoto);

.factory("demoFac", ['$http', '$q',
  function($http, $q) {
    var obj = {};

    obj.fetchUserDetails = function() {
      var promises = [];
      for (id = 10; id < 16; id++) {
        var promiss = $http.get('http://jsonplaceholder.typicode.com/photos/' + id);
        promises.push(promiss);
      }
      return $q.all(promises);
    }
    return obj;
  }
]);

})();*/