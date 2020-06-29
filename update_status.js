var that;
module.exports = class Master{
	constructor(req,res,con,ffmpeg){
this.res=res;
this.req=req;
this.con=con;

this.ffmpeg=ffmpeg;
that=this;


	}
 initiate(){

var msisdn=that.req.body.msisdn;
console.log(msisdn);

var resolution=that.req.body.resolution;

var id=that.req.body.id;
var filename=that.req.body.file_name;


var moment = require('moment');
moment().utcOffset("+05:30").format();
     var created_on=moment().format('YYYY-MM-DD_H_mm_ss');
  var modified_on=moment().format('YYYY-MM-DD H:mm:ss');
let date = moment(moment.now()).format('YYYYMMDDHHMMSS')
resolution="_1280x"+resolution+".mp4";
console.log("filename="+filename);
var new_name=date + resolution;

 that.ffmpeg("./public/uploads/"+filename)

            // Generate 720P video
            .output("public/uploads/"+new_name)
            .videoCodec('libx264')  
            .noAudio()
            .size('1280x'+that.req.body.resolution)
		  
		    

            .on('error', function(err) {
                console.log('An error occurred11: ' + err.message);
                that.res.send({"error":err.message});
                
            })	
            .on('progress', function(progress) { 
                console.log('... frames: ' + progress.frames);
                
            })
            .on('end', function() { 
                console.log('Finished processing'); 
var sql="update  video_details set file_name='"+new_name+"', modified_on='"+created_on+"' ,resolution='"+resolution+"' where id='"+id+"'"

that.con.query(sql,function(err){
if(err) throw err;

that.res.send({"data":"Sucessfull"});
});



                
            })
.run();








  










}
}



