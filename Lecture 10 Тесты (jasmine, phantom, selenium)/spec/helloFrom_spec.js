describe('People describe', function() {
	var personMan = null;
	var personStudent = null;
	var personProfesor = null ;
		 beforeEach(function() {
			personMan = new Man("Jim", 25);
			personStudent = new Student("Jim", 25);
			personProfesor = new Profesor("Jim", 25, 'Js');
		});

describe("Man", function() {

		it("'Man' shul send arguments  'name', 'age'",function() {
			expect(Man.length).toBeGreaterThan(1);
		})
		it('Man shuld has this.name and get name', function() {
			expect(personMan.name).toBeTruthy();
		})
		it('Man shuld has this.age and get age', function() {
			expect(personMan.age).toBeTruthy();
		});

		it("Man shuld has method 'live'", function() {
			spyOn(personMan, 'live');
			personMan.live();
			return expect(personMan.live).toHaveBeenCalled();
		});

});

describe("Student", function() {

		it("'Student' shuld send arguments 'name', 'age'",function() {
			expect(Student.length).toBeGreaterThan(1);
		});
		it("Student shuld has method 'study'", function() {
			spyOn(personStudent, 'study');
			personStudent.study();
			return expect(personStudent.study).toHaveBeenCalled();
		});
		it("'Student' shuld be inherit from Man ",function() {
			expect(Student.prototype instanceof Man).toBeTruthy();
	});

});

describe("Profesor", function() {

		 it("Profesor shuld has method 'Subject'", function() {
			spyOn(personProfesor, 'Subject');
			personProfesor.Subject();
			return expect(personProfesor.Subject).toHaveBeenCalled();
		});
		it("'Profesor' shuld shul send arguments 'name', 'age', 'subject'",function() {
			expect(Profesor.length).toBeGreaterThan(2);
	});
		it('Profesor shuld has this.subject', function() {
			expect(personProfesor.subject).toBeTruthy();
		});
		it("'Profesor' shuld be inherit from Man ",function() {
			expect(Profesor.prototype instanceof Man).toBeTruthy();
	});

		describe("Profesor shuld can change subject", function() {
		 it("checks type name", function() {
			spyOn(personProfesor, 'changeSubject');
			personProfesor.changeSubject("Biology");
			expect(personProfesor.changeSubject).toHaveBeenCalledWith(jasmine.any(String));
		});
	});
});
describe('duckType function', function() {
	it("should distinguish Student", function () {
		expect(duckType.call(personStudent)).toEqual('type: Student');
	});
	it("should distinguish Profesor", function () {
		expect(duckType.call(personProfesor)).toEqual('type: Profesor');
	});
	it( "should distinguish Man", function () {
		expect(duckType.call(personMan)).toEqual('type: Man');
	});
	})

})