
const db = require('../utils/create-sequelize-instance');

const LoginInfo = db.sequelize.define('LoginInfo', {
    id:{type:db.Datatypes.INTEGER, primaryKey:true, autoIncrement:true},
    loginTime:{type:db.Datatypes.DATE},
    userName:{type:db.Datatypes.STRING},
    osName:{type:db.Datatypes.STRING},
    browser:{type:db.Datatypes.STRING},
    ip:{type:db.Datatypes.STRING},
    loginStatus:{type:db.Datatypes.STRING}
},{
    // 表名
    tableName:'logininfo',
    // 不要忘记启用时间戳！
    timestamps: true,

    // 想要 createdAt 但是希望名称叫做 createTime
    createdAt: 'loginTime',

    // 不想要 updatedAt
    updatedAt: false
}) ;

module.exports = LoginInfo ;