angular
	.module('myApp', ['ngResource'])
	.controller('customersCtrl',customersCtrl);

	/*.controller('customersCtrl',customersCtrl)
function customersCtrl(dataResourceFhoto){
	var Picture = this;
	Picture.list = [];

	var photo = dataResourceFhoto.getPhoto();

// 	for (var i = 10; i < 17 ; i++) {
// 				Picture.list.push(photo.get({},{'id':i}));
// }

	for (var i = 10; i < 17 ; i++) {
	photo.get({'id':i},function(response){
			Picture.listPictures = response;
				Picture.list.push(Picture.listPictures);
		},function(err){
			console.log(err);
		});
	}
};*/

	function customersCtrl(dataHttPhoto){
	var Picture = this;
	Picture.list = [];

		function getPhoto() {
				dataHttPhoto.getPhoto()
						.success(function (custs) {
								Picture.customers = custs;

								for(var i = 20; i < 29; i++){
									Picture.list.push(Picture.customers[i]);
								}

						})
						.error(function (error) {
								return Picture.status = 'Unable to load customer data: ' + error.message;
						});
		}
		getPhoto();
}

// я не впевнений чи той чи цей метод правильніший
//*** 2-й спосіб ***
/*.controller('customersCtrl', ['demoFac',
  function(demoFac) {
    var Picture = this;

    Picture.list = [];

    demoFac.fetchUserDetails().then(function(response) {
      for (var i = 0; i < response.length; i++) {
        Picture.list.push({
          title: response[i].data.title,
          thumbnailUrl: response[i].data.thumbnailUrl
        });
      }
    });

    console.log(Picture.list);
  }
]);*/

