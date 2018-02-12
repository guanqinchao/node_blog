/**
* ģ������
*/
 
 const express = require('express')
,settings = require('./settings')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, ejs = require('ejs')
, session = require('express-session')  
, SessionStore = require("session-mongoose")(express);
const MongoStore = require('connect-mongo')(session);
const app = express();

app.configure(function(){ 
  app.set('views', __dirname + '/views'); 
  app.set('view engine', 'ejs'); 
  app.use(express.bodyParser()); 
  app.use(express.methodOverride()); 
  app.use(express.cookieParser()); 
  app.use(express.session({ 
    secret: settings.cookieSecret, 
    store: new MongoStore({ 
     /*  db: settings.db ; */
	   /*��������*/  
    url: 'mongodb://localhost/session',
	interval: 120000
    }) 
  })); 
  app.use(app.router); 
  /* app.use(express.router(routes));//�����е�·�ɹ�������ȥ  */
  app.use(express.static(__dirname + '/public')); 
}); 

//��������
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({secret : 'fens.me'}));
app.use(express.session({
secret : 'fens.me',
/* store: store, */
cookie: { maxAge: 900000 }
}));
app.use(function(req, res, next){
res.locals.user = req.session.user;
next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// ����ģʽ
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

// ·������
//basic
app.get('/', routes.index);
app.get('/reg', routes.reg);
 
app.get('/login', routes.login);
app.post('/login', routes.doLogin);

 
app.get('/logout', routes.logout);

 
app.get('/home', routes.home);


 



app.get('/users', user.list);

// �������˿�
http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
}); 




