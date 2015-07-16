//1 - функции-конструкторы
function Man(name, age){
	this.name = name;
	this.age = age;
}


Man.prototype.live = function(){
		return "live: "+ this.name +", " + this.age;
}

function Student(name, age){
	this.base = Man;
	this.base(name, age);
}
Student.prototype = new Man;
Student.prototype.study = function(){
		console.log("Student " + this.name + " stadying");
	}

function Profesor(name, age, subject){
	this.base = Man;
	this.base(name, age);
	this.subject = subject;
}

Profesor.prototype = new Man;
Profesor.prototype.Subject = function(){
		console.log("Profesor " + this.name + ", subject: " + this.subject);
	};
Profesor.prototype.changeSubject = function( newSubject){
		this.subject = newSubject;
	};
function duckType(){
	if (this.study){
		return "type: Student";
	} else if (this.Subject){
		return "type: Profesor";
	}	else{
		return "type: Man";
	};
}
 
var manVasja = new Man("Vasja",20);
var studOleg = new Student("Oleg", 30);
var profesorAlex = new Profesor('Alex', '9as8', 'JavaScript');

duckType.call(manVasja);
duckType.call(studOleg);
duckType.call(profesorAlex);

