// minimalistic working solution

const axios =  require('axios')

const persons = []
let tempId = -1

function Person(name = '') {
    const person = {
        id: tempId--,
        name
    }
    persons.push(person)
    axios({
        url: 'http://localhost:8080/api/persons',
        method: 'POST',
        data: {
            name: person.name,
            clientId: person.id
        }
    })
    .then((response) => {
        const data = response.data
        // get the person from the store
        const idx = persons.findIndex(item => item.id === data.clientId)
        persons[idx].id = data.id
        // check if the person was renamed since the request was sent
        if(persons[idx].name !== data.name) {
            // patch the server
            rename(persons[idx].name)
        }
    })

    function rename(name) {
        // update the client store
        person.name = name
        // a serverside id is required for a PATCH
        if(person.id > -1) {
            axios({
                url: `http://localhost:8080/api/persons/${person.id}`,
                method: 'PATCH',
                data: {
                    name: person.name
                }
            }).then(() => {
                list().then((response) => {
                    console.log("store on server:", response.data.persons)
                    console.log('store on client:', persons)
                })
            })
        }
    }

    function list() {
        return axios({
            url: 'http://localhost:8080/api/persons',
            method: 'GET'
        })
    }

	var api = {
        rename,
        list
	}
 
	return api
}

// execute program
const person = Person()
console.log('person created:', persons)
person.rename('John')
console.log('renamed to John:', persons)
