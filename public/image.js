var server_url1;
export  default class Report{
constructor(server_url){
  server_url1=server_url;

}

get_data(){

  return `
<div class="container-fluid">

          <div class="row">
                    <div class="col-md-12">
                        <nav>
                            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Video Details</a>
                           <a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home1" role="tab" aria-controls="nav-home" aria-selected="true">Upload Video</a>
                                     
                            </div>
                           
                        </nav>
<div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
    <table id='table11' class='table' style={{width:'100%'}}>
<thead>
<tr>
<th>Sl NO</th>
<th>Created On</th>
<th>Video File </th>
<th>Resolution</th>
<th>Action</th>
</tr>
</thead>
<tbody></tbody>


</table>
                            </div>
                            <div class="tab-pane fade" id="nav-home1" role="tabpanel" aria-labelledby="nav-profile-tab">

<form id='form'>
  <br/>

  Upload File (Only .mp4,max size 500MB):
<br/>
<input type='file' name='file'/>
<br/><br/>
  
<button id='upload' class='btn btn-primary'>Upload</button>


</form>



                                
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
  `;
}


get_action(){




$("body").on("click","#upload",function(e){
  $("#upload").attr("disabled",true);
  e.preventDefault();
 var formData=new FormData($(this).parent()[0]);
formData.append("auth_token",localStorage.getItem("auth_token"));

formData.append("msisdn",localStorage.getItem("msisdn"));
fetch(server_url1+'/upload_video', {
  method: 'POST', // or 'PUT'
  
  body: (formData),
})
.then((response) => response.json())
.then((data) => {
try{
if(typeof data.error!='undefined'){
  $("#upload").attr("disabled",false);
alert(data.error);
return;
}
}catch(e){

}

alert(data.data);
document.location.reload();
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
  $("#upload").attr("disabled",false);
});



  });



try{
  var tab;
tab.destroy();
}catch(e){

}

      
   
           tab= $("#table11").DataTable({
                  "processing": true,
        "serverSide": true,
        "bPaginate":true, // Pagination True
      "sPaginationType":"full_numbers", // And its type.
       "iDisplayLength": 10,
      
        select: true,
       //Initial no order.
         "search": {
    "search": ''
  },
        "ajax": {
           //  "url": "get_completed_tests_for_print_backup.php",
           url:server_url1+"/get_report_file", 
   data:{auth_token:localStorage.getItem("auth_token"),msisdn:localStorage.getItem("msisdn")},
   dataType:"JSON",
   type:"POST",
   
           
            "dataSrc": function (json1) {
          var return_data=new Array(); 
          var data=json1.data;
          var k=1;
          for(var i=0;i<data.length;i++){
           
              
              
        return_data.push({
              
          'id':k++,
          "created_on":data[i].created_on,
          
         "file_name":"<a target='_new' href='uploads/"+data[i].file_name+"'>"+data[i].file_name+"</a>",
         "resolution":data[i].resolution,
         "action":"<select class='process' file_name='"+data[i].file_name+"' values='"+data[i].id+"'>"
 
         +"<option>--select--</option>"

         +"<option value='1080'>1080p</option>"
         +"<option value='720'>720p</option>"
         +"<option value='480'>480p</option>"
         +"<option value='360'>360p</option>"
         +"<option value='240'>240p</option>"
         +"</select>",
        
         

         
        
           "recordsTotal":11,
          
           "recordsFiltered":11,
          
        });
       }
    //$("#table11_filter").find("input").css({"width":"700px","margin-left":"-50%"});
       $("#table11_filter").find("input").attr("placeholder","Search  File Name ");
      return return_data;
       }
    
        } ,
        // "createdRow": function ( row, data, index ) {
         
        //         $('td',row).find(".credit").parent().parent().addClass('highlight');
            
        // },
         "columnDefs": [
        { 
            //"targets": [ 0,2,3,5], //first column / numbering column
            "orderable": false, //set not orderable
        },
        ],
        "columns": [
           { "data": "id" },
           { "data": "created_on" },
            { "data": "file_name" },
                                    // { "data": "heirarchy" },
                                      { "data": "resolution" },
           { "data": "action" },
          
                              // {"data":"prepaid_wallet"},
                                  
               
        ]
   
             });
              





$("body").on("change",".process",function(e){
  $(this).attr("disabled",true);
  e.preventDefault();
 var formData={};
 var res=$(this).val();
var formData={"auth_token":localStorage.getItem("auth_token"),
"msisdn":localStorage.getItem("msisdn"),
"resolution":res,
"id":$(this).attr("values"),
"file_name":$(this).attr("file_name")
}
fetch(server_url1+'/update_status', {
  method: 'POST', // or 'PUT'
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  
  body:JSON.stringify(formData),
})
.then((response) => response.json())
.then((data) => {
try{
if(typeof data.error!='undefined'){
  $(this).attr("disabled",false);
alert(data.error);
return;
}
}catch(e){

}

alert(data.data);
document.location.reload();
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
  $(this).attr("disabled",false);
});



  });


}



  }