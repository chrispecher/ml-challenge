const axios =  require('axios')

const restUrl = 'http://localhost:8080/api'

const rest = {
    add: (obj, type, store, callback) => {
        axios({
            url: `${restUrl}/${type}`,
            method: 'POST',
            data: obj
        })
        .then((response) => {
            const data = response.data
            const idx = store.items.findIndex(item => item.id === data.clientId)
            const storeItem = store.items[idx]
            storeItem.id = data.id
            // check if the person was renamed since the request was sent, TODO: PUT entire obj
            if(storeItem.name !== data.name) {
                // patch the server
                rest.update(type, storeItem.id, 'name', data.name)
            }
            callback(data.id)
        })
        .catch(error => { console.error(error); throw error; });
    },
    update: (type, id, field, value) => {
        if(id > -1) {
            axios({
                url: `${restUrl}/${type}/${id}`,
                method: 'PATCH',
                data: {
                    [field]: value
                }
            })
        }
    },
    list: async (type) => {
        const res = await axios({
            url: `${restUrl}/${type}`,
            method: 'GET'
        })
        return res.data
    }
}

module.exports = rest