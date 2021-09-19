const request = require('postman-request')
const { callbackify } = require('util')

const testsites = ((municipality, callback) => {
    const url = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_COVID19_Testing_Sites/FeatureServer/5/query?where=municipality%20%3D%20'" + municipality + "'&outFields=*&outSR=4326&f=json"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to testing site service', undefined)
        } else if (body.error) {
            callback('Unable to find location, Please enter a municipality', undefined)
        } else {
            callback(undefined, console.log(body.features)
            )
            }
    })
})

module.exports = testsites

