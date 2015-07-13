(function(){
	
angular
	.module('myApp')
	.directive('clickme', clickme)
	.directive('hideme', hideme);

	function getE(a) {
		return document.getElementById(a);
	}

	function clickme () {
	return function(scope, element, attrs) {
		var clickingCallback = function() {
		 getE('wrapper').style.display = 'block';
			getE('wrapper').innerHTML = '<img ng-src="' + attrs.ngSrc + '" src="' + attrs.ngSrc  + '">';
		};
		element.bind('click', clickingCallback);
	};
}

	function hideme (){
		return function(scope, element, attrs) {
		var clickingCallback = function() {
			this.style.display = 'none';
			this.innerHTML = '';
		};
		element.bind('click', clickingCallback);
	};
}

})();