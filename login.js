var that;
module.exports = class Master{
	constructor(req,res,con){

this.req=req;
this.res=res;
this.con=con;
that=this;


	}
 initiate(){
var uid=that.req.body.uid;
var pwd=that.req.body.pwd;

var sql="update member_login set auth_token=uuid() where msisdn='"+uid+"'";
that.con.query(sql,function(err){
if(err){
throw err;
}



var sql="select * from member_login where msisdn='"+uid+"' and pwd='"+pwd+"'";
var query=that.con.query(sql,function(err,result){
if(err){
throw err;
}
if(result.length>=1){

that.res.send({"data":result});

}else{
that.res.send({"error":"Login Failed"});
}



});




});

}
}