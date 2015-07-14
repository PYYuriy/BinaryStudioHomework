angular
	.module('myApp', ['ngResource'])
	.controller('customersCtrl',customersCtrl);


// function customersCtrl(dataResourceFhoto){
// 	var Picture = this;
// 	Picture.list = [];
// 	dataResourceFhoto.getPhoto().query({},function(response){
// 			Picture.list = response.slice(30, 40);
// 		},function(err){
// 			console.log(err);
// 		});
// 	}

	function customersCtrl(dataHttPhoto){
	var Picture = this;
	Picture.list = [];

		function getPhoto() {
				dataHttPhoto.getPhoto()
						.success(function (custs) {
								Picture.list = custs.slice(20,30);
						}).error(function (error) {
								return console.log( 'this err' + error);
						});
}
		getPhoto();
}