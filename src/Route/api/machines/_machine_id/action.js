const Restful = require('~/Util/restful')
module.exports = function (router, { Model, Wrapper, Errors, Definition, Cache }) {
  router.get('/', Wrapper(async (req, res, next) => {
    res.status(200).send(req.context.machine.get())
  }))
}
