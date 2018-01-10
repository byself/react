/**
 * session中间件
 */

const logger = global.logger || console;
const uuidv4 = require('uuid/v4');

const cacheService = require('../services/cacheService');

/**
 * 检查cookie，设置session
 * @param next
 */
function *sessionHandler(next) {

  let sid = this.cookies.get('sid')
  if(sid) {
    let session = yield cacheService.get(sid);
    logger.info(session);
    if(session) {
      logger.info('get session %s', sid);
      this.session = session;
    } else {
      this.cookies.set('sid', '');
    }
  }
  yield next

}

exports = module.exports = sessionHandler
