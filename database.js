let nextId = 0
const persons = []

function Person() {
    function create(name) {
        let person = {
            id: nextId,
            name
        }
        persons.push(person)
        console.log("person added to db: ", person)
        return nextId++
    }

    function rename (id, name) {
        const idx = persons.findIndex((item) => {
            return item.id === parseInt(id)
        })
        persons[idx].name = name
    }

    function list() {
        return persons
    }

	var api = {
        create,
        rename,
        list,
	}
 
	return api
}

module.exports = { Person }