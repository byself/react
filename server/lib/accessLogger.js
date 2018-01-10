/**
 * 访问日志中间件
 */

const logger = global.logger || console;

/**
 * 记录访问日志
 * 通过yield来划分请求入和出
 * @param next
 */
const accessLogger = function* (next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  logger.info('%s %s - %sms', this.method, this.url, ms)
}

exports = module.exports = accessLogger;
