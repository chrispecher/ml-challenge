const axios =  require('axios')

const restUrl = 'http://localhost:8081/api'

const rest = {
    add: async (obj, type, store) => {
        const res = await axios({
            url: `${restUrl}/${type}`,
            method: 'POST',
            data: obj
        })
        return res.data
    },
    update: async (type, id, field, value) => {
        if(id > -1) {
            const res = await axios({
                url: `${restUrl}/${type}/${id}`,
                method: 'PATCH',
                data: {
                    [field]: value
                }
            })
            return res.data
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