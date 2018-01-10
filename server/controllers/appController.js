/**
 * Created by wangzili on 2017/7/26.
 */

const Router = require('koa-router');

const router = new Router();

const applicationService = require('../services/applicationService');

const errors = require('../consts/errors');

/**
 * 验证token
 */
router.get('/token/:token', function* () {
    logger.info('验证token:', this.params.token);
    const token = this.params.token;
    logger.info('token:', token);
    let user = yield applicationService.checkToken(token);
    logger.info("==============", user);
    if(user && user.data){
        if(user.data.requestId){
            this.session.requestId = user.data.requestId;
        }

        if(user.data.userId){
            this.session.userId = user.data.userId;
        }

        if(user.data.appId){
            this.session.appId = user.data.appId;
        }
    }

    this.body = user;
});

/**
 * 获取GPS
 */
router.post('/getGPS', function* () {
    logger.info('获取GPS');
    if(!this.session.gps){ // 在一次session中，gps未上传时才上传gps信息
        if(this.session && this.session.appId ){
            const appId = this.session.appId;
            const body = this.request.body;
            let data = yield applicationService.getGPS(appId, body);

            if(data){
                this.session.gps = true;
            }

            this.body = data;
        }else{
            this.body = {
                errCode: -1,
                errMsg: "登录信息失效，请重新登录",
                url: "/?return_url=" + encodeURIComponent(this.request.header["referer"])
            }
        }
    }else{
        this.body = true
    }
});

exports = module.exports = router;
