const { person } = require('./model')
const dataStorage = require('./datastorage')

const person1 = person()
person1.update('name', 'John')

setTimeout(()=>{
    dataStorage('persons').getAllFromServer().then((res) =>{
        console.log('serverlist', res.persons)
        console.log('clientlist', dataStorage('persons').getAllFromClient())
        console.log('person1.id', person1.id)
        console.log('person1.name', person1.name)
    })
}, 1000)