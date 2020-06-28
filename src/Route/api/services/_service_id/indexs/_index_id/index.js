module.exports = function (router, { Wrapper, Errors, Definition, Cache }) {
  router.use(Wrapper(async (req, res, next) => {
    let index_id = parseInt(req.params.index_id) || 0
    let index = await Definition.service_index.findByPk(index_id)
    if (index === null) { throw new Errors.ObjectNotFound('index not exist.') }
    req.context.index = index
    next()
  }))
}

