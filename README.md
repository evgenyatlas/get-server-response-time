# get-server-response-time [![NPM version](https://badge.fury.io/js/get-server-response-time.svg)](https://npmjs.org/package/get-server-response-time) [![Build Status](https://travis-ci.org/jeckyhit/get-server-response-time.svg?branch=master)](https://travis-ci.org/jeckyhit/get-server-response-time)

> Module for checking the response time of the server for node.js and browser

## Installation

```sh
$ npm install --save get-server-response-time
```

## Usage

```js
var getServerResponseTime = require('get-server-response-time')
//simple call
getServerResponseTime('https://google.com')
    .then(responseTime => {
        console.log(responseTime)
    })

//call with additional parameters
getServerResponseTime('https://google.com', {
    timeout: 5000 //maximum waiting time for server response | default: 5000
    responseInCaseError: true //Whether to return the response time of the server in case of an error | default: true
})
```

## License

MIT © [jeckyhit](https://github.com/jeckyhit)
