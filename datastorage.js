const rest = require('./rest')

const stores = {}

const getStore = (type) => {
    if(!stores[type]) {
        stores[type] = {
            tempId: -1,
            items: []
        }
    }
    return stores[type]
}

const dataStorage = (type) => {
    const store = getStore(type)
    return {
        add: (obj, callback) => {
            obj.id = obj.clientId = store.tempId--
            store.items.push(obj)
            rest.add(obj, type, store, callback)
            return obj.id
        },
        update: (id, field, value) => {
            const idType = id < 0 ? 'clientId' : 'id'
            const idx = store.items.findIndex(item => item[idType] === id)
            store.items[idx][field] = value
            rest.update(id, field, value, type)
        },
        getAllFromServer: async () => {
            return await rest.list(type)
        },
        getAllFromClient: () => {
            return store.items
        }
    }
}

module.exports = dataStorage