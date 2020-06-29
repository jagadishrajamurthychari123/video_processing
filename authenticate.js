var that;
module.exports = class Master{
	constructor(req,res,con){

this.req=req;
this.res=res;
this.con=con;
that=this;


	}
 initiate(check){
var uid=that.req.query.auth_token;
var pwd=that.req.query.pwd;



var sql="select * from member_login where auth_token='"+uid+"' ";
console.log(sql)
var query=that.con.query(sql,function(err,result){
if(err){
throw err;
}
if(result.length>=1){
console.log(sql)
check(1);

}else{
check(0);
}



});






}
}