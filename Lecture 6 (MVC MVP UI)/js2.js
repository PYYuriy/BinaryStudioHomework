function Model(obj) {
		for (var key in obj) {
				this[key] = obj[key];
		}
}

function Controller(obj) {
		for (var key in obj) {
				this[key] = obj[key];
		}

		document.getElementById(this.elemetId).innerHTML = this.render(); 
		this.setHandlers();
		this.checkModelChanges();
}

Controller.prototype.setHandlers = function () {
		var that = this;

		document.getElementById(that.elemetId).onclick = function (e) {
				var id = '#' + e.srcElement.getAttribute('id'),
						handler = that.clickHandlers[id];
				if (handler) {
						that[handler].call(that);
				}
		};
};

Controller.prototype.checkModelChanges = function () {
		var that = this;
		
		setInterval(function () {
				if (that.model.changed) {
						document.getElementById(that.elemetId).innerHTML = that.render(); 
						that.model.changed = false;
				}
		}, 100);
};

// bootstrap

var Student = new Model({
		name: 'Piotr',
		age: 22,
		year: 5,
		examsTaken: 2,
		takeExam: function () {
				this.examsTaken++;
				this.changed = true;
		}
});

var StudentController = new Controller({
		model: Student,
		elemetId: 'student-container',
		render: function () {
				return '<span> ' + this.model.name + ' </span> ' +
						'<button id="student-exams-button">Increase taken exams</button> '+
						'<span id="examsTaken">' + this.model.examsTaken + '</span>';
		},
		clickHandlers: {
				'#student-exams-button': 'updateExams'
		},
		updateExams: function () {
				this.model.takeExam();
		}
});