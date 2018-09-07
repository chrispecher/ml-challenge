const dataStorage = require('./datastorage')

const crud = (obj, type) => {
    // get the store for the type
    const store = dataStorage(type)
    let _id = store.add(obj, (id) => {
        _id = id
    })
    return {
        id: _id,
        update: (field, value) => {
            obj[field] = value
            store.update(_id, field, value)
        }
    }
}

const person = (name = '') => {
    const obj = {
        name
    }
    return Object.assign(obj, crud(obj, 'persons'))
}

module.exports = { person }