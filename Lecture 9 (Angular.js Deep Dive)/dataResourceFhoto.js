	(function(){

	angular
	.module('myApp')
	.factory("dataResourceFhoto",dataResourceFhoto);
	function dataResourceFhoto ($resource){
		var urlBase = 'http://jsonplaceholder.typicode.com/photos/:id';
		dataResourceFhoto.getPhoto = function () {
				return $resource(urlBase, {id: "@id"}, {
					'query':{
						method:'GET',
						isArray:true, 
						interceptor : {
										responseError : function (error) {
														return console.log('Unable to load customer data: ' + error);
										}
						}
					}
			})
		};
	return dataResourceFhoto;
}

})();