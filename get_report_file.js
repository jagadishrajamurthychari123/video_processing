var error;
var created_by="";
var that;
var count=0;
module.exports = class master {	
constructor(req,res,con){
	that=this ;
	console.log("con="+con);
	that.res=res;
	that.req=req;
	that.con=con;
	that.search=that.req.body.search.value;
    that.index=that.req.body.start;
    that.per_page=that.req.body.length;
	that.msisdn=that.req.body.msisdn;
	that.column=that.req.body.column;
	that.direction=that.req.body.direction;
	that.from_date="";
	that.msisdn=that.req.body.msisdn;
	
}

initiate(){


try{
    
    
   
    
 if (!that.req.body.auth_token||!that.msisdn) {
      
   res.send({"error":"Auth Token mandatory"});
  } else  {
	  
	  
      
     if(that.search==""){
         
		 
		 var sql="select count(*) as count from video_details ";

		 
               console.log("Error ;;;;"+sql);
            var query = that.con.query(sql, function(err, result) {
				
                count=result[0].count;
            });
         
        var sql="select * from video_details ";

	   
	   
	   console.log("Error ;;;;"+sql);
            var query = that.con.query(sql, function(err, result) {
   if (err){ 
       
        
            }else{
				that.res.send({
					"data":result,
					 "recordsTotal":count ,
            "recordsFiltered":count,
				});
				
			}
			
          
            
           
            
        });
        
     }else{
         
         
		 var sql="select count(*) as count from video_details where   (file_name like '%"+that.search+"%' ) limit "+that.index+","+ that.per_page;
		 
	   console.log("Error ;;;;1"+sql);
            var query = that.con.query(sql, function(err, result) {
                count=result[0].count;
				console.log("aaaa=count="+count);
            });
         var sql="select * from video_details where   (file_name like '%"+that.search+"%' ) limit "+that.index+","+ that.per_page;
		 
		 console.log("Error ;;;;ok"+sql);
            var query = that.con.query(sql, function(err, result) {
				
				try{
				
   if (err){ 
      
        
            }else{
				 that.res.send({
					"data":result,
					 "recordsTotal":count ,
            "recordsFiltered":count,
				});
			}
			
           
            
		}catch(e){
					 console.log(sql);
					  that.res.send({"error":e.sqlMessage,"sql":sql}); 
				 }
					
			
			
            
            
           

        });
        
     }
       
        
        
    }
 }catch(e){
      console.log("Error="+e.message);
  }
}
	
	
	
	
 
}