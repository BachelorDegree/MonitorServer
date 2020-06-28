const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.get('/', Wrapper(async (req, res, next) => {
    const query = new Restful.Query(req.query)
    const options = query.allowWhere({
      name: 'name',
      type: 'string'
    }).allowPagination(1000, 2000).getOptions()
    let services = await Definition.service.findAll(options)
    res.status(200).send(services)
  }))
  router.post('/', Wrapper(async (req, res, next) => {
    const crud = new Restful.Crud(req.body)
    let service = await crud.create(Definition.service, {
      required: [{
        name: 'name',
        type: 'string'
      }, {
        name: 'desc',
        type: 'string'
      }]
    })
    res.send(service)
  }))
}
