const HttpStatus = require('http-status-codes')
// https://www.npmjs.com/package/http-status-codes
/**
 * @apiDefine InvalidParameter
 * @apiError InvalidParameter Some request parameter is not vaild.
 * @apiErrorExample {json} InvalidParameter:
 * HTTP/1.1 400 BAD_REQUEST
 * {
 *    "message": [reason],
 *    "type": 'InvalidParameter'
 * }
 */
class InvalidParameter extends Error {
  handler(req, res, next) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine LimitExceed
 * @apiError LimitExceed request faild as resource exceed limit
 * @apiErrorExample {json} LimitExceed:
 * HTTP/1.1 400 BAD_REQUEST
 * {
 *    "message": [reason],
 *    "type": 'LimitExceed'
 * }
 */
class LimitExceed extends InvalidParameter {
  handler(req, res, next) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine ObjectExpire
 * @apiError ObjectExpire request faild as resource expire
 * @apiErrorExample {json} ObjectExpire:
 * HTTP/1.1 400 BAD_REQUEST
 * {
 *    "message": [reason],
 *    "type": 'ObjectExpire'
 * }
 */
class ObjectExpire extends InvalidParameter {
  handler(req, res, next) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine InvalidAuth
 * @apiError InvalidAuth Auth faild
 * @apiErrorExample {json} InvalidAuth:
 * HTTP/1.1 401 UNAUTHORIZED
 * {
 *    "message": [reason],
 *    "type": 'InvalidAuth'
 * }
 */
class InvalidAuth extends InvalidParameter {
  handler(req, res, next) {
    res.status(HttpStatus.UNAUTHORIZED).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine DangerImage
 * @apiError DangerImage The uploaded image may be yellow
 * @apiErrorExample {json} DangerImage:
 * HTTP/1.1 400 BAD_REQUEST
 * {
 *    "message": [reason],
 *    "type": 'DangerImage'
 * }
 */
class DangerImage extends InvalidParameter {
  handler(req, res, next) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine NotWXArticle
 * @apiError NotWXArticle the article is not form weixin
 * @apiErrorExample {json} NotWXArticle:
 * HTTP/1.1 400 BAD_REQUEST
 * {
 *    "message": [reason],
 *    "type": 'NotWXArticle'
 * }
 */
class NotWXArticle extends InvalidParameter {
  handler(req, res, next) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine RequestRetry
 * @apiError RequestRetry error occur and please retry the request
 * @apiErrorExample {json} RequestRetry:
 * HTTP/1.1 400 BAD_REQUEST
 * {
 *    "message": [reason],
 *    "type": 'RequestRetry'
 * }
 */
class RequestRetry extends InvalidParameter {
  handler(req, res, next) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine PermissionDenied
 * @apiError PermissionDenied permission denied
 * @apiErrorExample {json} PermissionDenied:
 * HTTP/1.1 403 FORBIDDEN
 * {
 *    "message": [reason],
 *    "type": 'PermissionDenied'
 * }
 */
class PermissionDenied extends Error {
  handler(req, res, next) {
    res.status(HttpStatus.FORBIDDEN).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine IllegalTime
 * @apiError IllegalTime cur time is not illegal
 * @apiErrorExample {json} PermissionDenied:
 * HTTP/1.1 403 FORBIDDEN
 * {
 *    "message": [reason],
 *    "type": 'IllegalTime'
 * }
 */
class IllegalTime extends Error {
  handler(req, res, next) {
    res.status(HttpStatus.FORBIDDEN).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine RequireLogin
 * @apiError RequireLogin login is required
 * @apiErrorExample {json} RequireLogin:
 * HTTP/1.1 401 UNAUTHORIZED
 * {
 *    "message": [reason],
 *    "type": 'RequireLogin'
 * }
 */
class RequireLogin extends PermissionDenied {
  handler(req, res, next) {
    res.status(HttpStatus.UNAUTHORIZED).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine RequireCompleteWXInfo
 * @apiError ask user to provide wx user info
 * @apiErrorExample {json} RequireCompleteWXInfo:
 * HTTP/1.1 401 UNAUTHORIZED
 * {
 *    "message": [reason],
 *    "type": 'RequireCompleteWXInfo'
 * }
 */
class RequireCompleteWXInfo extends InvalidParameter {
  handler(req, res, next) {
    res.status(HttpStatus.UNAUTHORIZED).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine ObjectNotFound
 * @apiError ObjectNotFound object not found.
 * @apiErrorExample {json} ObjectNotFound:
 * HTTP/1.1 404 ObjectNotFound
 * {
 *    "message": [reason],
 *    "type": 'ObjectNotFound'
 * }
 */
class ObjectNotFound extends Error {
  handler(req, res, next) {
    res.status(HttpStatus.NOT_FOUND).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine InternalError
 * @apiError InternalError Internal server error
 * @apiErrorExample {json} InternalError:
 * HTTP/1.1 500 INTERNAL_SERVER_ERROR
 * {
 *    "message": [reason],
 *    "type": 'InternalError'
 * }
 */
class InternalError extends Error {
  handler(req, res, next) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: this.message,
      type: this.constructor.name
    })
  }
}
/**
 * @apiDefine ExternalServiceError
 * @apiError ExternalServiceError External server error.
 * @apiErrorExample {json} ExternalServiceError:
 * HTTP/1.1 500 INTERNAL_SERVER_ERROR
 * {
 *    "message": [reason],
 *    "type": 'ExternalServiceError'
 * }
 */
class ExternalServiceError extends Error {
  // handler (req, res, next) {
  //   res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
  //     message: this.message,
  //     type: this.constructor.name
  //   })
  // }
}
class DockerError extends ExternalServiceError {
}
module.exports = {
  InvalidParameter,
  InvalidAuth,
  PermissionDenied,
  ObjectNotFound,
  InternalError,
  ExternalServiceError,
  RequireLogin,
  DangerImage,
  RequireCompleteWXInfo,
  IllegalTime,
  LimitExceed,
  NotWXArticle,
  RequestRetry,
  ObjectExpire,
  DockerError
}
