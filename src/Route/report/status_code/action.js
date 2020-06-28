const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.post('/', Wrapper(async (req, res, next) => {
    let datas = req.body
    console.log(datas)
    let services_name = new Set()
    for (let data of datas) {
      data.caller_service_name = data.caller_service_name.trim()//.split('.')[0]
      data.callee_service_name = data.callee_service_name.trim()//.split('.')[0]
      services_name.add(data.caller_service_name)
      services_name.add(data.callee_service_name)
    }
    let services = await Definition.service.findAll({
      where: {
        name: {
          '$in': [...services_name]
        }
      }
    })
    let services_name_map = new Map()
    for (let service of services) {
      services_name_map.set(service.name, service.id)
    }
    for (let name of services_name) {
      if (services_name_map.has(name) === false) {
        let service = await Definition.service.create({
          name: name
        })
        services_name_map.set(name, service.id)
      }
    }
    let toCreate = []
    let now = Math.floor(Date.now() / 1000 / 60) * 60
    for (let data of datas) {
      if (services_name_map.has(data.caller_service_name) && services_name_map.has(data.callee_service_name)) {
        toCreate.push({
          report_machine_id: data.report_machine_id,
          caller_service_id: services_name_map.get(data.caller_service_name),
          callee_service_id: services_name_map.get(data.callee_service_name),
          is_client_report: data.is_client_report,
          status_code: data.status_code,
          count: data.count,
          time: now
        })
      }

    }
    await Definition.service_status_code_log.bulkCreate(toCreate)

    res.send({})
  }))
}
