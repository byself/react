/**
 * request包装器，以适配generator function
 */

const _request = require('request');
const _ = require('lodash');

const logger = global.logger || console;

/**
 * 默认参数
 * @type {{headers: {User-Agent: string, Content-Type: string}, json: boolean}}
 */
const defaultOptions = {
  headers: {
    'User-Agent': 'request 2.74.0',
    'Content-Type': 'application/json'
  },
  json: true
}

function request (uri, options) {
  return function (callback) {
    _request(uri, _.merge({}, defaultOptions, options), function (error, response) {
      callback(error, response);
    })
  }
}

/**
 * 对于常见方法，添加请求日志记录
 */
for (var attr in _request) {
  if (_request.hasOwnProperty(attr)) {
    if (['get','post','put','patch','head','del'].indexOf(attr) > -1) {
      //trunkify request's convenience methods
      request[attr] = (function(attr) {
        return function (uri, options) {
          logger.info('request begin: %s %s', attr, uri);
          return function (callback) {
            _request[attr](uri, _.merge({}, defaultOptions, options), function (error, response) {
              logger.info('request end:   %s %s', attr, uri);
              callback(error, response);
            })
          }
        }
      })(attr);
    } else {
      request[attr] = _request[attr];
    }
  }
}

module.exports = request;
