module.exports = {
    username: "spring",
    password: "52Spring",
    database: "myapp",
    host: "bj-cdb-n62eozet.sql.tencentcdb.com",
    dialect: "mysql",
    timezone:"+08:00",
    dialectOptions:{
        charset: 'gbk'
    },
    port: 63298,
    pool:{
        max: 5,
        min: 0,
        idle: 10000,
        acquire:30000,
        evict: 1000
    }
} ;