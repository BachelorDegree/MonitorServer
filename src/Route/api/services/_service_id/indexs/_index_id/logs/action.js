const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.get('/', Wrapper(async (req, res, next) => {
    const query = new Restful.Query(req.query)
    const options = query.allowPagination(1000, 2000).getOptions({
      order: [['time', 'desc']]
    })
    let from = parseInt(req.query.from)
    let to = parseInt(req.query.to)
    if (from && to) {
      options.where.time = {
        '$between': [from, to]
      }
    }
    let logs = await req.context.index.getLogs(options)
    res.status(200).send(logs)
  }))
}
