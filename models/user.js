
const db = require('../utils/create-sequelize-instance');

const User = db.sequelize.define('User', {
    id:{type:db.Datatypes.INTEGER, primaryKey:true, autoIncrement:true},
    userName:{type:db.Datatypes.STRING},
    password:{type:db.Datatypes.STRING},
    nickName:{type:db.Datatypes.STRING},
    status:{type:db.Datatypes.INTEGER},
    manager:{type:db.Datatypes.INTEGER},
    createTime:{type:db.Datatypes.DATE}
},{
    // 表名
    tableName:'user',
    // 不要忘记启用时间戳！
    timestamps: true,

    // 想要 createdAt 但是希望名称叫做 createTime
    createdAt: 'createTime',

    // 不想要 updatedAt
    updatedAt: false
}) ;

module.exports = User ;