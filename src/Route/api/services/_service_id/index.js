module.exports = function (router, { Wrapper, Errors, Definition, Cache }) {
  router.use(Wrapper(async (req, res, next) => {
    let service_id = parseInt(req.params.service_id) || 0
    let service = await Definition.service.findByPk(service_id)
    if (service === null) { throw new Errors.ObjectNotFound('service not exist.') }
    req.context.service = service
    next()
  }))
}

