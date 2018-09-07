// problematic client

const axios =  require('axios')

// init store
const persons = []
// start with a negative tempId
let nextId = -1

const updateServer = (person) => {
    if (person.id < 0) { // ah negative id, must be a new person, right?
        axios({
            url: 'http://localhost:8080/api/persons',
            method: 'POST',
            data: {
                name: person.name
            }
        })
        .then(syncStore()) // not sure, better sync ;)
    }
    else {
        // other naive implementations
    }
}

const syncStore = () => {
    axios({
        url: 'http://localhost:8080/api/persons',
        method: 'GET'
    })
    .then((response) => {
        Object.assign(persons, response.data.persons)
        console.log("local store after server sync:", persons)
    }) 
}

const addPerson = (name = '') => {
    const person = {id: nextId--, name}
    // add the person to the local store
    persons.push(person)
    console.log('person added to local store:', persons)
    // sync with server
    updateServer(person)
    return person
}

const renamePerson = (person, name) => {
    // get the person from the local store
    personInStore = persons.find(element => element.id = person.id)
    // update the name
    personInStore.name = name
    console.log('person renamed in local store:', persons)
    // sync with server
    updateServer(person)
}

// execute program
const person = addPerson()
renamePerson(person, 'John')
