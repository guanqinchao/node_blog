
/*
 * GET home page.
 */
exports.reg = function(req, res) { 
  res.render('reg', {
       title: '用户注册', 
    });   
   
}; 
 
exports.doReg = function(req, res) { 
           //检验用户两次输入的口令是否一致 
  if (req.body['password-repeat'] != req.body['password']) { 
    req.session.messages = ['error,两次输入的口令不一致'];
    return res.redirect('/reg'); 
  } 
//生成口令的散列值 
  var md5 = crypto.createHash('md5'); 
  var password = md5.update(req.body.password).digest('base64'); 
   
  var newUser = new User({ 
    name: req.body.username, 
    password: password, 
  }); 
   
  //检查用户名是否已经存在 
  User.get(newUser.name, function(err, user) { 
    if (user) 
      err = 'Username already exists.'; 
    if (err) { 
	req.session.messages = ['error', err];
      return res.redirect('/reg'); 
    } 
    //如果不存在则新增用户 
    newUser.save(function(err) { 
      if (err) { 
        req.session.messages =['error', err]; 
        return res.redirect('/reg'); 
      } 
      req.session.user = newUser; 
      req.session.messages =['success', '注册成功']; 
      res.redirect('/'); 
    }); 
  }); 
}; 
exports.index = function(req, res){
res.render('index', { title: 'Index' });
};
exports.login = function(req, res){
res.render('login', { title: '用户登陆'});
};
exports.doLogin = function(req, res){
var user={
username:'admin',
password:'admin'
}
if(req.body.username===user.username && req.body.password===user.password){
req.session.user=user;
return res.redirect('/home');
} else {
req.session.error='用户名或密码不正确';
/* console.log('用户名或密码不正确'); */
return res.redirect('/login');
}
};
/* exports.logout = function(req, res){
res.redirect('/');
};
exports.home = function(req, res){
var user={
username:'admin',
password:'admin'
}
res.render('home', { title: 'Home',user: user});
}; */
exports.logout = function(req, res){
req.session.user=null;
res.redirect('/');
};
exports.home = function(req, res){
res.render('home', { title: 'Home'});
};