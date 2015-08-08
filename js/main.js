var changeBadgeCount = function(type, value) {
    var count = $("#menu-" + type + " .badge").text();
    count = parseInt(count) + value;
    $("#menu-" + type + " .badge").text(count);
};
var hideCategories = (function (event) {


}

$(document).ready(function() {
  console.log("Document is ready for action!");
  $("#menu-animals").click(function() {
  	hideCategories
    $("#animals").addClass("panel-primary");
    $("#food").removeClass("panel-primary");
    $("#movies").removeClass("panel-primary");
  });
  $("#menu-food").click(function() {
    $("#food").addClass("panel-primary");
    $("#animals").removeClass("panel-primary");
    $("#movies").removeClass("panel-primary");
  });  
  $("#menu-movies").click(function() {
    $("#movies").addClass("panel-primary");
    $("#animals").removeClass("panel-primary");
    $("#food").removeClass("panel-primary");
  });
 	$("form").submit(function (event) {
 	event.preventDefault();
    var type = $("#type").val();
    var item = $("#item").val();
    if (item === "") {
      $("#item-error").show();
      return;
    } 
    $("#item-error").hide();   
    var newHtml = "<li>" + item + "</li>";
    //Add new item to <li>
    $("#" + type + " .favorite-list").append(newHtml);
    //Clear entry form
    $("#item").val("");
    //Increment badge count
	changeBadgeCount(type,1); 
  });	
	$(".favorite-list").click(function (event) {
    var target = event.originalEvent.target
    var type = $(target).closest(".panel").attr("id")
    var item = target.innerText
    var validate = confirm("Are you sure you want to delete " + item + "?")
	if (validate === true) {
    	//Decrease badge count and delete
    	changeBadgeCount(type,-1);
    	$(target).remove();
    };	
  }); 	

});