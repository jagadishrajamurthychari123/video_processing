$("#kmf_name").html(localStorage.getItem("kmf_name"));


$("body").on("click","#logout",function(){
localStorage.setItem("kmf_msisdn","");
localStorage.setItem("kmf_name","");
localStorage.setItem("kmf_role","");
localStorage.setItem("kmf_auth_token","");
document.location.reload();
});