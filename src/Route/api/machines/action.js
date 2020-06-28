const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.get('/', Wrapper(async (req, res, next) => {
    const query = new Restful.Query(req.query)
    const options = query.allowWhere({
      name: 'name',
      type: 'string'
    }, {
      name: 'ip',
      type: 'string'
    }).allowPagination(1000, 2000).getOptions()
    let machines = await Definition.machine.findAll(options)
    res.status(200).send(machines)
  }))
  router.post('/', Wrapper(async (req, res, next) => {
    const crud = new Restful.Crud(req.body)
    let machine = await crud.create(Definition.machine, {
      required: [{
        name: 'name',
        type: 'string'
      }]
    })
    res.send(machine)
  }))
}
