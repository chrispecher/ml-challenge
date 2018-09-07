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
        init: (obj) => {
            obj.id = obj.clientId = store.tempId--
            store.items.push(obj)
            return obj.id
        },
        save: async (obj) => {
            const res = await rest.add(obj, type, store)
            // update client store id with sever id
            const idx = store.items.findIndex(item => item.id === res.clientId)
            const storeItem = store.items[idx]
            storeItem.id = res.id
            return res
        },
        update: async (id, field, value) => {
            // update item in the client store
            const idx = store.items.findIndex(item => item.id === id)
            store.items[idx][field] = value
            // update on server
            return await rest.update(type, id, field, value)
        },
        getById: (id) => {
            const idx = store.items.findIndex(item => item.id === id)
            return store.items[idx]
        },
        allFromServer: async () => {
            return await rest.list(type)
        },
        allFromClient: () => {
            return store.items
        }
    }
}

module.exports = dataStorage