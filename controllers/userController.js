const User = require('../models/user') ;
const LoginInfo = require('../models/loginInfo');
//引入验证与无害化方法
const { body,validationResult,sanitizeBody } = require('express-validator');
//浏览器UA解析
const UAParser = require('ua-parser-js');

//首页
exports.index = (req, res) => { res.render('index') ;};
//主页
exports.home = (req, res) => { res.render('home') ;};
//登陆请求
exports.user_login = [
    body('userName', '请输入账户名').isLength({ min:1 }).trim(),
    body('password', '请输入密码').isLength({ min:1 }).trim(),
    sanitizeBody('userName').trim().escape(),
    sanitizeBody('password').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        //登陆状态
        var sucFlag = 2 ;
        var logFlag = '0';

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('index', { message:'请输入账户名'});
            return ;
        }else{
            User.findOne({where:{userName:req.body.userName, password:req.body.password}, raw:true})
                .then(data => {
                    if(data != null){
                        sucFlag = data.status ;
                        if(sucFlag == 1){
                            logFlag = '1';

                            //登陆成功，写入session
                            req.session.userName = req.body.userName ;
                        }
                    }

                    res.send({sucFlag:sucFlag, }) ;

                    var ua = req.headers['user-agent'] ;
                    var uaParser = new UAParser(ua) ;

                    //登陆日志
                    LoginInfo.create({
                        userName: req.body.userName,
                        osName:uaParser.getOS().name,
                        browser:uaParser.getBrowser().name,
                        ip:req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, ''),
                        loginStatus:logFlag
                    });

                }).catch(err => {
                    console.error(err) ;
            });
        }
    }
];