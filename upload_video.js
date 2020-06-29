var that;
module.exports = class Master{
	constructor(req,res,con,file_name){
this.res=res;
this.req=req;
this.con=con;
this.file_name=file_name;
that=this;


	}
 initiate(){

var msisdn=that.req.body.msisdn;
console.log(msisdn);
that.res.send({"data":"Sucessfull"});
var moment = require('moment');
moment().utcOffset("+05:30").format();
     var created_on=moment().format('YYYY-MM-DD_H_mm_ss');
  var modified_on=moment().format('YYYY-MM-DD H:mm:ss');
  
var sql="insert into   video_details(created_on,file_name,created_by)"
+"values('"+modified_on+"','"+that.file_name+"','"+msisdn+"')";

that.con.query(sql,function(err){
if(err) throw err;
});









}
}



