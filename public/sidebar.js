export  default class Sidebar{
constructor(){

}

get_data(){

  return `
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="home.html">
        <div class="sidebar-brand-icon rotate-n-15">
          
        </div>
        <div class="sidebar-brand-text mx-3">Video </div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      
      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Interface
      </div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span>Video Processing:</span>
        </a>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Video Processing:</h6>
            <a class="collapse-item" href="home">Video Processing</a>
          </div>
        </div>
      </li>

      

    </ul>
  `;
}


get_action(){
//alert($(location).attr("href").split('/').pop());
var url=$(location).attr("href").split('/').pop();
$("#accordionSidebar li").each(function(){
$(this).removeClass("active");
var custom_url=$(this).find("a").each(function(){
 var custom_url= $(this).attr("href");
// alert(url+"<>"+custom_url)
  if(url.split("?")[0]==custom_url.split("?")[0]){

$(this).addClass("active");
$(this).parent().addClass("active");
$(this).parent().parent().addClass("active show");
}else{
  $(this).removeClass("active");

}
})
//alert(custom_url)

});


}



  }