const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.post('/', Wrapper(async (req, res, next) => {
    res.send({})
    return
    const crud = new Restful.Crud(req.body)
    let id = parseInt(req.body.machine_id)
    let machine = await Definition.machine.findByPk(id)
    if (machine === null) {
      throw new Errors.ObjectNotFound('no such machine')
    }
    let log = await crud.create(Definition.machine_log, {
      required: [{
        name: 'avg_load',
        type: 'string'
      }, {
        name: 'mem_usage',
        type: 'string'
      }, {
        name: 'io_stat',
        type: 'string'
      }, {
        name: 'process_info',
        type: 'string'
      }, {
        name: 'disk_info',
        type: 'string'
      }],
      postpone: (e) => {
        e.time = Math.floor(Date.now() / 1000 / 60) * 60
      }
    })
    machine.cpu = req.body.cpu
    machine.avg_load = log.avg_load
    machine.mem_usage = log.mem_usage
    machine.io_stat = log.io_stat
    machine.process_info = log.process_info
    machine.disk_info = log.disk_info
    machine.last_upload_time = log.time
    await machine.save()
    res.send(log.get())
  }))
}
