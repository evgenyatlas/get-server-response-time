const http = require('http')
const https = require('https')
const { URL } = require('url')

module.exports = function getServerResponseTime(urlServer, options) {
    const regExp = new RegExp("^(http|https)://", "i")
    if (!regExp.test(urlServer))
        return reject(new Error('Please specify the urlServer format of http://yourServer.com'))

    options = options ? options : {}
    options.timeout = options.timeout === undefined ? 6000 : options.timeout
    options.responseInCaseError = options.responseInCaseError === undefined ? true : options.responseInCaseError

    return new Promise((resolve, reject) => {
        try {
            const url = new URL(urlServer)
            let startTime = 0
            let request = null

            const callbackForReq = res => {
                res.resume()
                let endTime
                if (!options.responseInCaseError && res.statusCode !== 200)
                    return reject(new Error(`Request Failed.\n + Status Code: ${res.statusCode}`))
                endTime = Date.now() - startTime
                resolve(endTime)
            }

            switch (url.protocol) {
                case 'http:':

                    startTime = Date.now()

                    request = http.get(url, callbackForReq)
                    request.setTimeout(options.timeout, () => {
                        request.abort()
                        reject(new Error('Connection timed out. Check the server or increase the wait time in the options.timeout parameter'))
                    })
                    break
                case 'https:':

                    startTime = Date.now()

                    request = https.get(url, callbackForReq)
                    request.setTimeout(options.timeout, () => {
                        request.abort()
                        reject(new Error('Connection timed out. Check the server or increase the wait time in the options.timeout parameter'))
                    })
                    break

                default:
                    reject(new Error('Unsupported protocol'))
                    break
            }

        } catch (error) {
            reject(error)
        }
    })
}
