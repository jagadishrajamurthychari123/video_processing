var express = require('express'),
        app = express();
        //session = require('express-session');
var bodyParser = require('body-parser');
var ffmpeg = require('fluent-ffmpeg');

//var upload = multer({ dest: '../uploads/'});
var moment = require('moment');
  moment().utcOffset("+05:30").format();
     var created_on=moment().format('YYYY-MM-DD');
	 var file_name=[];

	


//var ejs = require('ejs');
var path=require('path');

  //var MySql = require('sync-mysql');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//app.use(multer());
app.use(express.json());

var fs = require('fs');

app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
 //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, form-data");
    next();
});
app.set('trust proxy', 1)

//app.use(bodyParser.text({ type: 'text/*' }))
var http = require('http').Server(app);
//var cors = require('cors');
var server = http.listen(5000, function () {
    console.log('listening on *:5000');
});


var mysql = require('mysql');

//app.use(express.static(__dirname + '/assets'));
app.use(express.static(path.join(__dirname, 'public')));

  //app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
var db_config = {
    
};


var con = "";
function handleDisconnect() {
    con = mysql.createConnection({
		
		host: "127.0.0.1",
    user: "root",
    password: "",
    database: "video",
	
	}); // Recreate the connection, since
    // the old one cannot be reused.

    con.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } else {
            console.log("connected");
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();




app.post('/login', function (req, res) {
    console.log(req.body);

    var master= require('./login.js');
  var c=new master(req,res,con);
c.initiate();



});

app.get('/', function (req, res) {
   // res.sendFile( "./index.html"  , { root : __dirname});
res.render('index'); 
});



// Logout endpoint
app.get('/logout', function (req, res) {
    console.log(JSON.stringify(req.query));
   eval(fs.readFileSync('logout.js') + '');
res.redirect('/')   
});





app.get('/home', function (req, res) {
  console.log(req.query.auth_token)
 var master= require('./authenticate.js');
  var c=new master(req,res,con);
var flag=c.initiate(function check(flag){
	console.log("checking="+flag);
	if(flag==1){
res.render('home');	 
}else{
	res.redirect('/')
}
});

});



app.post('/get_report_file', function (req, res) {
 
 var master= require('./authenticate1.js');
  var c=new master(req,res,con);
var flag=c.initiate(function check(flag){
	console.log("checking");
	if(flag==1){
	 var master= require('./get_report_file.js');
  var c=new master(req,res,con);
c.initiate();
}else{
	res.send({"error":"Authentication Failed","data":""});
}
});




});


app.post('/update_status', function (req, res) {
  console.log("jaga="+JSON.stringify(req.body));

        var master= require('./authenticate1.js');
  var c=new master(req,res,con);
var flag=c.initiate(function check(flag){
  console.log("checking");
  if(flag==1){
   
console.log("File="+JSON.stringify(req.body));
       
var master= require('./update_status.js');
  var c=new master(req,res,con,ffmpeg);
c.initiate();
}else{
  res.send({"error":"Authentication Failed","data":""});
}
});

   


 



});
app.post('/upload_video', function (req, res) {
    console.log(req.body);
    const helpers = require('./helpers.js');
 var file_name=[];
 var multer = require('multer');
 const storage = multer.diskStorage({
    destination : function(req, file, cb){
      this.req=req;
this.res=res;
this.con=con;
that=this;
console.log("File1="+that.req.files);
        cb(null, 'public/uploads/');
    },
 filename: function (req, file, cb) {
  this.req=req;
this.res=res;
this.con=con;
that=this;

   let date = moment(moment.now()).format('YYYYMMDDHHMMSS')
   var name =file.originalname.replace(/-/g, '_').replace(/ /g, '_');
  file_name.push(date + '_' + name);
        
        cb(null, date + '_' + name)
    }

})
const upload = multer({storage : storage,  fileFilter: helpers.imageFilter,limits: {
   fieldSize: 500 * 1024 * 1024
}}).any();
upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
console.log("File="+JSON.stringify(req.body));
        if (req.fileValidationError) {
            return res.send({"error":req.fileValidationError});
        }
       
        else if (err instanceof multer.MulterError) {
            return res.send({"error":err.message});
        }
        else if (err) {
            return res.send({"error":err.message});
        }

var master= require('./upload_video.js');
  var c=new master(req,res,con,file_name);
c.initiate();
   
     }); 
  


});






