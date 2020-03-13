var should = chai.should();

describe('localStorage storage test Example one', function () {
	it("return String: 'Tom'", function () {
		var dog = Tstorage.data('dog', { key: 'dog1', value: 'Tom' })
		dog.should.equal('Tom')
	})
})
describe('localStorage storage read test Example one', function () {
	it("return String:'Tom'", function () {
		var dog = Tstorage.data('dog').dog1
		dog.should.equal('Tom')
	})
})


describe('localStorage storage test Example two', function () {
	it('Return object: {"name":"Charlie","age":"tow"}', function () {
		var dog = Tstorage.data('dog', {
			key: 'dog2',
			value: {
				name: 'Charlie',
				age: 'tow'
			}
		})

		var mirrorDog = JSON.stringify({ name: 'Charlie', age: 'tow' })
		dog = JSON.stringify(dog)
		dog.should.equal(mirrorDog)
	})
})
describe('localStorage storage read test Example two', function () {
	it('Return object: {"name":"Charlie","age":"tow"}', function () {
		var dog = Tstorage.data('dog').dog2

		var mirrorDog = JSON.stringify({ name: 'Charlie', age: 'tow' })
		dog = JSON.stringify(dog)
		dog.should.equal(mirrorDog)
	})
})


describe('localStorage time limit storage test, if the time option is milliseconds, you need to test it yourself', function () {
	it('Return object: {"name": "Cleo","age": "one"}', function () {
		var cat = Tstorage.data('cat', {
			key: 'cat1',
			value: {
				name: 'Cleo',
				age: 'one'
			},
			time: 5 * 60 * 60
		})

		var mirrorCat = JSON.stringify({ name: 'Cleo', age: 'one' })
		cat = JSON.stringify(cat)
		cat.should.equal(mirrorCat)
	})
})
describe('localStorage time limit storage test, time option is date', function () {
	it('Return object: {"name": "Cleo","age": "one"}', function () {
		var cat = Tstorage.data('cat', {
			key: 'cat2',
			value: {
				name: 'Candy',
				sex: 'man'
			},
			time: '2099-3-7 8'
		})

		var mirrorCat = JSON.stringify({ name: 'Candy', sex: 'man', limitTime: '4076524800000' })
		cat = JSON.stringify(cat)
		cat.should.equal(mirrorCat)
	})
})

describe('time option is past time, the storage is invalid', function () {
	it('Return object: undefined', function () {
		var octopus = Tstorage.data('octopus', {
			key: 'octopus1',
			value: {
				name: 'pual',
				sex: 'man'
			},
			time: '2020-3-7 8'
		})
		octopus = String(octopus)
		octopus.should.equal('undefined')
	})
})


describe('sessionStorage time limit storage test, session storage time limit it is invalid', function () {
	it('Return object: {"name": "Luna","sex": "woman"}', function () {
		var Koala = Tstorage.session.data('Koala', {
			key: 'Koala1',
			value: {
				name: 'Luna',
				sex: 'woman'
			},
			time: 5 * 60 * 60
		})

		var mirrorKoala = JSON.stringify({ name: 'Luna', sex: 'woman' })
		Koala = JSON.stringify(Koala)
		Koala.should.equal(mirrorKoala)
	})
})


describe('Does localStorage have a dog table ?', function () {
	it("return String:'Tom'", function () {
		var dog = Tstorage.has('dog')
		dog.dog1.should.equal('Tom')
	})
})
describe('Does the dog1 object exist in the localStorage dog table ?', function () {
	it("return String:'Tom'", function () {
		var dog = Tstorage.has('dog', 'dog1')
		dog.should.equal('Tom')
	})
})
