const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.post('/', Wrapper(async (req, res, next) => {
    const crud = new Restful.Crud(req.body)
    let logs = await crud.create(Definition.service_index_log, {
      allowBulk: true,
      required: [{
        name: 'service_index_id',
        type: 'integer'
      }, {
        name: 'machine_id',
        type: 'integer'
      }, {
        name: 'value',
        type: 'integer'
      }],
      postpone: (e) => {
        e.time = Math.floor(Date.now() / 1000 / 60) * 60
      }
    })
    res.send(logs)
  }))
}
