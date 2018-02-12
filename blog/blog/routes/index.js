
/*
 * GET home page.
 */
exports.reg = function(req, res) { 
  res.render('reg', {
       title: '�û�ע��', 
    });   
   
}; 
 
exports.doReg = function(req, res) { 
           //�����û���������Ŀ����Ƿ�һ�� 
  if (req.body['password-repeat'] != req.body['password']) { 
    req.session.messages = ['error,��������Ŀ��һ��'];
    return res.redirect('/reg'); 
  } 
//���ɿ����ɢ��ֵ 
  var md5 = crypto.createHash('md5'); 
  var password = md5.update(req.body.password).digest('base64'); 
   
  var newUser = new User({ 
    name: req.body.username, 
    password: password, 
  }); 
   
  //����û����Ƿ��Ѿ����� 
  User.get(newUser.name, function(err, user) { 
    if (user) 
      err = 'Username already exists.'; 
    if (err) { 
	req.session.messages = ['error', err];
      return res.redirect('/reg'); 
    } 
    //����������������û� 
    newUser.save(function(err) { 
      if (err) { 
        req.session.messages =['error', err]; 
        return res.redirect('/reg'); 
      } 
      req.session.user = newUser; 
      req.session.messages =['success', 'ע��ɹ�']; 
      res.redirect('/'); 
    }); 
  }); 
}; 
exports.index = function(req, res){
res.render('index', { title: 'Index' });
};
exports.login = function(req, res){
res.render('login', { title: '�û���½'});
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
req.session.error='�û��������벻��ȷ';
/* console.log('�û��������벻��ȷ'); */
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