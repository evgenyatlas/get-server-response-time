const http = require('http')
const https = require('https')
const { URL } = require('url')

module.exports = function getServerResponseTime(urlServer) {
    return new Promise((resolve, reject) => {
        try {

            const url = new URL(urlServer)
            let startTime = 0

            switch (url.protocol) {

                case 'http:':
                    startTime = Date.now()
                    http.get(url, res => {
                        const endTime = Date.now() - startTime
                        resolve(endTime)
                    })
                    break

                case 'https:':
                    startTime = Date.now()
                    https.get(url, res => {
                        const endTime = Date.now() - startTime
                        resolve(endTime)
                    })
                    break

                default:
                    throw new Error('Unsupported protocol')
                    break
            }

        } catch (error) {
            reject(error)
        }
    })
}
