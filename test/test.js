const assert = require('assert')
const server = require('../server')
const { person } = require('../model')
const dataStorage = require('../datastorage')

let serverHandle

before(async () => {
	server(8081)
})

const person1 = person()

describe('#person()', function() {
	it('created with id -1', function() {
		assert(person1.id === -1);
	});
	it('has id -1 in client store', function() {
		const idFromStore = dataStorage('persons').getById(person1.id).id
		assert(idFromStore === -1);
	});
	it('after save object has id 0 on client', async function() {
		const res = await person1.save()
		assert(person1.id === 0);
		assert(dataStorage('persons').getById(person1.id).id === 0)
	});
	it('after save object has id 0 on server', async function() {
		const res = await dataStorage('persons').allFromServer()
		const idx = res.persons.findIndex(item => item.id === person1.id)
		assert(res.persons[idx].id === 0)
	});
	it('after rename name was updated on the client', async function() {
		const name = 'John'
		const res = await person1.update('name', name)
		assert(person1.name === name);
		assert(dataStorage('persons').getById(person1.id).name === name)
	});
	it('after rename name was updated on the server', async function() {
		const res = await dataStorage('persons').allFromServer()
		const idx = res.persons.findIndex(item => item.id === person1.id)
		assert(res.persons[idx].name === person1.name)
	});
  });

