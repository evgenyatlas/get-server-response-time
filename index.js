// does not work normally due to webpack. #find another way
const isBrowser = require('./util/isBrowser')
module.exports = isBrowser() ? require('./lib/browser') : require('./lib/node')