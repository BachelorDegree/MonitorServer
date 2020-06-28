const Errors = require('./errors')
const _ = require('lodash')
const { formatByType, formatDBLike } = require('./validation')
class Query {
  constructor(params) {
    this.options = { where: {} }
    if (!(params instanceof Object)) {
      throw new Errors.InvalidParameter('body is not valid.')
    }
    this.params = params
  }
  /**
 * @apiDefine AllowPagination
 * @apiParam {Integer} [page] 第几页，从1开始
 * @apiParam {Integer} [per_page] 每页条数
 */
  allowPagination(default_perpage = 50, limit = 1000) {
    let params = this.params
    let page = parseInt(params.page) || 1
    if (page < 1) page = 1
    let per_page = parseInt(params.per_page) || default_perpage
    if (per_page < 1) { per_page = default_perpage }
    let actual_per_page = per_page > limit ? limit : per_page
    _.merge(this.options, {
      offset: (page - 1) * actual_per_page,
      limit: actual_per_page
    })
    return this
  }
  /**
 * @apiDefine AllowSearch
 * @apiParam {String} [keyword] 关键词
 */
  allowSearch(onProp) {
    if (onProp === undefined) { throw new Error('onProp must be defined') }
    let params = this.params
    let keyword = params.keyword
    if (params.keyword === undefined || (typeof keyword) !== 'string') { return this }
    keyword = formatDBLike(keyword)
    _.merge(this.options, {
      where: {
        [onProp]: {
          '$like': keyword// symbol not supported by _.merge
        }
      }
    })
    return this
  }
  /**
   * {
   *    name,
   *    type: integer,float,string,boolean
   *    as: optional
   * }
   */
  allowWhere(...params) {
    params.forEach(e => {
      let value = this.params[e.name]
      if (value === undefined) { return }
      value = formatByType(e.type, value)
      if (value === null) { return }
      let target = e.name
      if (e.as !== undefined) { target = e.as }
      this.options.where[target] = value
    })
    return this
  }
  allowOrderBy(...params) {
    if ((typeof this.params['order_by']) === 'string') {
      let col = this.params['order_by']
      let order = 'asc'
      if (this.params['order'] === 'desc') {
        order = 'desc'
      }
      if (params.indexOf(col) !== -1) {
        this.options.order = [[col, order]]
      }
    }
    return this
  }
  getOptions(merge = {}) {
    return _.merge({}, this.options, merge)
  }
}
class Crud {
  /**
   * {
   *  name,
   *  regexp,
   *  type,
   *  checker: function
   * }
   */
  constructor(params) {
    this.params = params
    if (!((params instanceof Object) || (params instanceof Array))) {
      throw new Errors.InvalidParameter('body is not valid.')
    }
  }
  /**
 * @apiDefine AllowBulk
 * @apiParam {Integer} [AllowBulk] 允许上传一个数组进行批量操作(该条仅用于标示，请忽略该参数))
 */
  // 如果allowBulk为true则返回数组，否则只返回创建了的对象（仅仅为了向下兼容）
  async create(definition, { required = [], optional = [], postpone = () => { }, filter, allowBulk = false, bulkLimit = 100, create }) {
    let datas = []
    if (this.params instanceof Array) {
      if (allowBulk) {
        datas = this.params
        if (datas.length > bulkLimit) {
          throw new Errors.InvalidParameter('Too much data.')
        }
      } else {
        throw new Errors.InvalidParameter('bulk create is not allowed.')
      }
    } else {
      datas = [this.params]
    }
    let options = []
    for (let data of datas) {
      let option = {}
      for (let e of required) {
        let value = data[e.name]
        if (value === undefined || value === null) { throw new Errors.InvalidParameter(`${e.name} is required.`) }
        value = formatByType(e.type, value)
        if (value === null) { throw new Errors.InvalidParameter(`${e.name} is type error.`) }
        if (e.regexp !== undefined) {
          if (!e.regexp.test(value)) { throw new Errors.InvalidParameter(`${e.name} is not valid.`) }
        }
        if (e.checker !== undefined) {
          if ((await e.checker(value)) === false) { throw new Errors.InvalidParameter(`${e.name} is not valid.`) }
        }
        option[e.name] = value
      }
      for (let e of optional) {
        let value = data[e.name]
        if (value === undefined || value === null) { continue }
        value = formatByType(e.type, value)
        if (value === null) { throw new Errors.InvalidParameter(`${e.name} is type error.`) }
        if (e.regexp !== undefined) {
          if (!e.regexp.test(value)) { throw new Errors.InvalidParameter(`${e.name} is not valid.`) }
        }
        if (e.checker !== undefined) {
          if ((await e.checker(value)) === false) { throw new Errors.InvalidParameter(`${e.name} is not valid.`) }
        }
        option[e.name] = value
      }
      if (filter !== undefined) {
        if ((await filter(option)) === false) { continue }
      }
      await postpone(option)
      options.push(option)
    }
    if (create === undefined) {
      if (allowBulk) {
        return definition.bulkCreate(options)
      } else {
        return definition.create(options[0])
      }
    } else {
      return create(options)
    }
  }
  async update(instance, allow = []) {
    if (!(this.params instanceof Object)) {
      throw new Errors.InvalidParameter('body is not valid.')
    }
    let options = []
    for (let e of allow) {
      let value = this.params[e.name]
      if (value === undefined || value === null) { continue }
      value = formatByType(e.type, value)
      if (value === null) { throw new Errors.InvalidParameter(`${e.name} is type error.`) }
      if (e.regexp !== undefined) {
        if (!e.regexp.test(value)) { throw new Errors.InvalidParameter(`${e.name} is not valid.`) }
      }
      if (e.checker !== undefined) {
        if ((await e.checker(value)) === false) { throw new Errors.InvalidParameter(`${e.name} is not valid.`) }
      }
      if (e.formatter !== undefined) {
        value = await e.formatter(value)
      }
      options.push({
        name: e.name,
        value
      })
    }
    options.forEach(e => {
      instance[e.name] = e.value
    })
    return instance.save()
  }
}
module.exports = {
  Query,
  Crud
}
