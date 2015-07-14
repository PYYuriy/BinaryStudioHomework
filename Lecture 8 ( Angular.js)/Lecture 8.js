var app = angular.module('personApp', []);

function getPersons() {
		return [{
				text: 'Mikl',
				city: 'Kiev',
				age: rand(),
				image: 'http://orig11.deviantart.net/402a/f/2012/322/c/4/c4a8542954d058cfeb578feb2d571a71-d5lc8hs.png',
				done: true
		}, {
				text: 'Sara',
				city: 'Lvov',
				age: rand(),
				image: 'http://a.deviantart.net/avatars/a/k/akhras.png?1',
				done: false
		}, {
				text: 'Jon',
				city: 'Mukachevo',
				age: rand(),
				image: 'http://1.bp.blogspot.com/-rcMgCi3vJhI/T1lJrqvV-AI/AAAAAAAAAGw/KrY5S_C0SYk/s1600/onfireg.png',
				done: true
		}, {
				text: 'Laura',
				city: 'Uzhorod',
				age: rand(),
				image: 'http://orig07.deviantart.net/132e/f/2010/309/6/2/swimsuit_miku_icon_50x50_by_nyappymiku22-d3286b1.png',
				done: false
		}];
}

function getGoods() {
		return [{
				name: 'Apple ',
				price: rand(),
				done: false
		}, {
				name: 'Potatoes',
				price: rand(),
				done: true
		}, {
				name: 'Cherries',
				price: rand(),
				done: false
		}, {
				name: 'berry',
				price: rand(),
				done: false
		}, {
				name: 'Banana ',
				price: rand(),
				done: true
		}];
}

function buildState(state) {
		state.hide = false;

		state.remaining = function() {
				var count = 0;
				angular.forEach(state.list, function(todo) {
						count += todo.done ? 0 : 1;
				});
				return count;
		};

		state.archive = function() {
				var oldTodos = state.list;
				state.list = [];
				angular.forEach(oldTodos, function(todo) {
						if (!todo.done) state.list.push(todo);
				});
		};

		state.toggle = function() {
				state.hide = state.hide ? false : true;
		};
}

app.controller('personListController', function() {
		this.list = getPersons();

		this.addPerson = function() {
				if (!!this.personName && !!this.personCity && !!this.personImage) {
						this.list.push({
								text: this.personName,
								city: this.personCity,
								age: rand(),
								image: this.personImage,
								done: false
						});
						this.personName = '';
						this.personAge = '';
						this.personCity = '';
						this.personImage = '';
				} else {
						alert('You didn\'t enter all information')
				}
		};

		buildState(this);
});

app.controller('goodsController', function() {
		this.list = getGoods();

		this.addGood = function() {
				if (!!this.goodName ) {
						this.list.push({
								name: this.goodName,
								price: rand(),
								done: false
						});
						this.goodName = '';
						this.goodPrice = '';
				} else {
						alert('You didn\'t enter all information')
				};
		};

		buildState(this);
});
function rand(){
	return (Math.floor(Math.random() * (41)))+10;
}