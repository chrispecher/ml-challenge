const dataStorage = require('./datastorage')

const storage = (obj, type) => {
    // get the store for the type
    const store = dataStorage(type)
    let _id = store.init(obj)
    return {
        id: _id,
        save: async () => {
            const res = await store.save(obj)
            _id = res.id
            return res
        },
        update: async (field, value) => {
            obj[field] = value
            return await store.update(_id, field, value)
        }
    }
}

const person = (name = '') => {
    const obj = {
        name
    }
    return Object.assign(obj, storage(obj, 'persons'))
}

module.exports = { person }