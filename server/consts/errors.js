
const errors = {};

errors.NO_AUTHORITY = {
  errCode: '-1',
  errMsg: '对不起，没有相应权限'
};

errors.NO_BINDING_HOSTPITAL = {
  errCode: '-1',
  errMsg: '好像没有配置对应的医院，请联系客服'
};

errors.BINDING_USER_FAILED = {
  errCode: '-1',
  errMsg: '无法绑定后台用户，请联系客服'
};

errors.DATA_NOT_ARRAY = {
    errCode: '-1',
    errMsg: '数据错误，请稍后再试'
};

exports = module.exports = errors;
