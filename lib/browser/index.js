module.exports = function getServerResponseTime(urlServer, options) {
    var regExp = new RegExp("^(http|https)://", "i")
    if (!regExp.test(urlServer))
        throw new Error('Please specify the urlServer format of http://yourServer.com')

    options = options ? options : {}
    options.timeout = options.timeout === undefined ? 6000 : options.timeout
    options.responseInCaseError = options.responseInCaseError === undefined ? true : options.responseInCaseError

    return new Promise(function (resolve, reject) {
        var startTime
        var xhr = new XMLHttpRequest()
        xhr.open('GET', urlServer, true)

        xhr.onload = function () {
            if (!options.responseInCaseError && this.status !== 200)
                reject(new Error(`Request Failed.\n + Status Code: ${this.status}`))
            var endTime = Date.now() - startTime
            resolve(endTime)
        }

        xhr.onerror = function () {
            reject(new Error("Network Error"))
        }

        startTime = Date.now()
        xhr.send()

        setTimeout(function () {
            xhr.abort()
            reject(new Error('Connection timed out. Check the server or increase the wait time in the options.timeout parameter'))
        }, options.timeout)
    })
}