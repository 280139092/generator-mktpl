/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribeAll(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
})
