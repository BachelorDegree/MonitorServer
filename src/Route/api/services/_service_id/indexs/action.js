const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.get('/', Wrapper(async (req, res, next) => {
    const query = new Restful.Query(req.query)
    const options = query.allowPagination(1000, 2000).getOptions({
    })
    let logs = await req.context.service.getServiceIndexs(options)
    res.status(200).send(logs)
  }))
}
