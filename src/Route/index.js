const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cookieSession = require('cookie-session')
module.exports = (router, { Model, Wrapper, Config }) => {
  // jsonparser
  // router.use(function (req, res, next) {
  //   req.rawBody = '';
  //   req.on('data', function (chunk) {
  //     req.rawBody += chunk;
  //   });

  //   req.on('end', function () {
  //     console.log(req.rawBody)
  //     next();
  //   });
  // });
  router.use(jsonParser)
  router.use(cookieSession({
    name: 'session',
    keys: [Config.env.sessionKey],
    // Cookie Options
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }))
  router.use((req, res, next) => {
    req.context = {}
    next()
  })
}
