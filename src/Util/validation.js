
const moment = require('moment')
function hasAllParamsById(arr1, arr2, id_key_arr1, id_key_arr2) {
  let arr1_keys = new Set()
  let arr2_keys = new Set()
  for (let e of arr1) {
    if (e[id_key_arr1] === undefined) { return false }
    arr1_keys.add(e[id_key_arr1])
  }
  for (let e of arr2) {
    if (e[id_key_arr2] === undefined) { return false }
    arr2_keys.add(e[id_key_arr2])
  }
  if (arr1_keys.size !== arr2_keys.size) {
    return false
  }
  for (let key of arr1_keys) {
    if (arr2_keys.has(key) === false) { return false }
  }
  return true
}
function objectHasProperties(obj, properties) {
  if ((obj instanceof Object) === false) {
    return null
  }
  let ret = {}
  for (let e of properties) {
    let value = obj[e.name]
    if (value === undefined || value === null) { return null }
    value = formatByType(e.type, value)
    if (value === null) {
      return null
    }
    if (e.regexp !== undefined) {
      if (!e.regexp.test(value)) {
        return null
      }
    }
    ret[e.name] = value
  }
  return ret
}
function formatByType(type, value) {
  let ret = null
  switch (type) {
    case 'integer':
      ret = parseInt(value)
      if (ret > 1000000000 || ret < -1000000000) {
        ret = null
      }
      if (Number.isNaN(ret) || !Number.isFinite(ret)) {
        ret = null
      }
      break
    case 'float':
      ret = parseFloat(value)
      if (Number.isNaN(ret) || !Number.isFinite(ret)) {
        ret = null
      }
      break
    case 'string':
      if (value === undefined || value === null) { ret = null } else { ret = String(value) }
      break
    case 'datetime':
      let tmp = moment(value)
      if (tmp.isValid() === false) { ret = null } else { ret = tmp.toISOString() }
      break
    case 'boolean':
      if (value === 'true' || value === true) {
        ret = true
      } else if (value === 'false' || value === false) {
        ret = false
      }
      break
  }
  return ret
}
function checkArray(arr, key, type) {
  if ((arr instanceof Array) === false) { return false }
  for (let e of arr) {
    if (e[key] === undefined) {
      return false
    }
    let tmp = formatByType(type, e[key])
    if (tmp === null) return false
    e[key] = tmp
  }
  return true
}
function formatDBLike(str) {
  return '%' + str.replace(/_/g, '\\_').replace(/%/g, '\\%') + '%'
}
function getBulkKeyValue(arr, key) {
  let set = new Set()
  arr.forEach(e => {
    set.add(e[key])
  })
  return Array.from(set)
}
module.exports = {
  hasAllParamsById,
  formatByType,
  checkArray,
  formatDBLike,
  objectHasProperties,
  getBulkKeyValue
}
