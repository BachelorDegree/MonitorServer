const Restful = require('~/Util/restful')
const { Op } = require('sequelize')
module.exports = function (router, { Wrapper, Errors, Definition, Sequelize }) {
  router.get('/', Wrapper(async (req, res, next) => {
    const query = new Restful.Query(req.query)
    let from = parseInt(req.query.from)
    let to = parseInt(req.query.to)
    let opt = {
      where: {}
    }
    if (from && to) {
      opt = {
        where: {
          time: {
            '$between': [from, to]
          }
        }
      }
    }
    if (req.query.is_client_report) {
      if (req.query.is_client_report === 'true') {
        opt.where.is_client_report = true
      } else {
        opt.where.is_client_report = false
      }
    }
    if (req.query.callee_service_id) {
      opt.where.callee_service_id = req.query.callee_service_id
    }
    if (req.query.caller_service_id) {
      opt.where.caller_service_id = req.query.caller_service_id
    }
    if (req.query.report_machine_id) {
      opt.where.report_machine_id = req.query.report_machine_id
    }
    if (req.query.status_code) {
      opt.where.status_code = req.query.status_code
    }
    opt.order = [['time', 'desc'], ['id', 'desc']]
    const options = query.allowPagination(1000, 2000).getOptions(opt)
    let logs = await req.context.service.getCallerServiceLogs(options)
    res.status(200).send(logs)
  }))
}
