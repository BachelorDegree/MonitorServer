const Config = require('./config-loader')()
module.exports = function (fn) {
  const stack = (new Error()).stack
  return function (req, res, next) {
    fn(req, res, next).catch(e => {
      try {
        // process the error here
        if (Config.dev.showFailedRequestLog === true) { console.log(stack, e) }
        if (e !== null && (typeof e) === 'object' && (typeof e.handler) === 'function') { e.handler(req, res, next) } else {
          console.log(e)
          let curStack = ((typeof e) === 'object' && (typeof e.stack) === 'string') ? e.stack : stack
          res.status(500).send('Internal error')
          let request = {}
          request.body = req.body
          request.originalUrl = req.originalUrl
          request.method = req.method
          let error = ''
          if (e && e.toString) { error = e.toString() } else { error = (new Error()).toString() }
          let request_json = ''
          try {
            request_json = JSON.stringify(request)
          } catch (e) { }
          console.error(error, request_json, curStack)
        }
      } catch (e) {
        console.error(e)
      }
    })
  }
}
