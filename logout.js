var sql="update member_login set auth_token='' where auth_token='"+req.query.auth_token+"' ";
console.log(sql)
var query=con.query(sql,function(){

});