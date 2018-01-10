
require('./init');

const Koa = require('koa');

const app = new Koa();

const Boom = require('boom');

const router = require('./router');

const path = require('path');

const bodyParser = require('koa-bodyparser');

const mount = require('koa-mount');

const serve = require('koa-static');

const views = require('koa-views');

const session = require('koa-session');

const cacheService = require('./services/cacheService');

/**
 * session设置
 */

app.keys = ['ctl-h5'];

const sessionConfig = {
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 7200000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  store: {
    get: function *(key) {
      let sess = yield cacheService.get(key)
      return sess;
    },
    set: function *(key, sess, maxAge) {
      yield cacheService.setEx(key, sess, maxAge/1000);
    },
    destroy: function *(key) {
      yield cacheService.del(key);
    }
  }
};

app.use(session(sessionConfig, app));

/**
 * 设置模板引擎及模板目录
 */
app.use(views(path.join(__dirname, 'views'), {
  map: {
    html: 'nunjucks'
  }
}));

/**
 * 设置访问日志记录
 */
app.use(require('./lib/accessLogger'));

app.use(function *(next) {
  try {
    yield next;
  } catch (e) {
    logger.error(e);
    this.status = e.status || 500;
    this.body = {
      errCode: -2,
      errMsg: e.message
    }
  }
});

const bodyOpts = {
    jsonLimit: '10mb',
    formLimit: '10mb'
}
app.use(bodyParser(bodyOpts));

/**
 * 设置静态文件处理中间件及静态文件目录
 * 配置默认查找后缀为html
 */
app.use(mount('/merchant', serve(path.join(__dirname, 'public'), {extensions: ['html']})))

/**
 * 设置路由
 */
app
  .use(router.routes())
  .use(router.allowedMethods());


/**
 * 应用端口
 */
const port = config.app.port || 3000;

/**
 * 启动应用
 */
app.listen(port, () => {
  logger.info('app start, listen on port %s', port)
});