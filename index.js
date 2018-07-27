const http = require('http')
const https = require('https')
const { URL } = require('url')

module.exports = function getServerResponseTime(urlServer, options = { timeout: 5000 }) {
    return new Promise((resolve, reject) => {
        try {

            const url = new URL(urlServer)
            let startTime = 0
            let request = null

            switch (url.protocol) {
                case 'http:':

                    startTime = Date.now()

                    request = http.get(url, _ => {
                        const endTime = Date.now() - startTime
                        resolve(endTime)
                    })
                    request.setTimeout(options.timeout, () => {
                        request.abort()
                        throw new Error('Connection timed out. Check the server or increase the wait time in the options.timeout parameter')
                    })
                    break
                //FIX: do not repeat yourself
                case 'https:':

                    startTime = Date.now()

                    request = https.get(url, _ => {
                        const endTime = Date.now() - startTime
                        resolve(endTime)
                    })
                    request.setTimeout(options.timeout, () => {
                        request.abort()
                        throw new Error('Connection timed out. Check the server or increase the wait time in the options.timeout parameter')
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
