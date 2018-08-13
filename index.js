const isBrowser = require('./util/isBrowser')

module.exports = isBrowser() ? require('./lib/browser') : require('./lib/node')