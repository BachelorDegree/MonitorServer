module.exports = function (router, { Wrapper, Errors, Definition, Cache }) {
  router.use(Wrapper(async (req, res, next) => {
    let machine_id = parseInt(req.params.machine_id) || 0
    let machine = await Definition.machine.findByPk(machine_id)
    if (machine === null) { throw new Errors.ObjectNotFound('machine not exist.') }
    req.context.machine = machine
    next()
  }))
}

