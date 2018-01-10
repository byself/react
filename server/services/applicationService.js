const util = require('util');
const request = require('../lib/requestWrapper');

const baseURI = config.service.application.baseURI;

const service = {};

/**
 * 验证token
 * @param token
 */
service.checkToken = function*(token) {

    let uri = util.format('%s/application/token/%s/check', baseURI, token);
    logger.info('验证token uri:', uri);
    let response = yield request.get(uri);
    return response.body;

    // return {
    //     "resultCode": "0",
    //     "resultInfo": "SUCCESS",
    //     "data": {
    //         "requestId": "requestid_XXXXXXXXXXXX",
    //         "userId": "userid_XXXXXXXXXXXX",
    //         "appId": "appid_XXXXXXXXXXXX"
    //     }
    // }
};


/**
 * 获取GPS
 * @param appId
 */
service.getGPS = function*(appId, body) {

    let uri = util.format('%s/application/%s/h5/extend', baseURI, appId);
    logger.info('获取GPS:', uri);
    let response = yield request.post(uri, {body: body});
    return response.body;

    // return true
};

exports = module.exports = service;