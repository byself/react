/**
 * koa-router的use方法与app.use方法不同，只有当存在路由匹配当时候才会起作用
 */

const Router = require('koa-router');
const router = new Router();

/**
 * 路由配置
 * 一个path对应一个controller
 * @type {[*]}
 */
const routes = [
  { path: '/api', controller: require('./controllers/appController')}
]

/**
 * 路由添加
 */
routes.forEach((route) => {
  router.use(route.path, route.controller.routes(), route.controller.allowedMethods());
});

exports = module.exports = router;