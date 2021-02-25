const express = require('express');
const router = express.Router();

//导入控制器模块
const user_controller = require('../controllers/userController');

//首页
router.get('/', user_controller.index);
//登陆请求
router.post('/user/login', user_controller.user_login);
//主页
router.get('/user/home', user_controller.home);

module.exports = router ;