const cfg = require('../config/config.js');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, {
    host:cfg.host,
    port:cfg.port,
    dialect:cfg.dialect,
    timezone:cfg.timezone,
    dialectOptions:cfg.dialectOptions,
    pool:cfg.pool
});

const db = {};

db.Sequelize = Sequelize ;
db.Datatypes = DataTypes ;
db.sequelize = sequelize ;

module.exports = db ;