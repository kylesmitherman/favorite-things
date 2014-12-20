$(document).ready(function() {

  $("#menu-animals").click(function() {
    $("#animals").addClass("panel-primary");
    $("#food").removeClass("panel-primary");
    $("#movies").removeClass("panel-primary");
  });

  $("#menu-food").click(function() {
    $("#animals").removeClass("panel-primary");
    $("#food").addClass("panel-primary");
    $("#movies").removeClass("panel-primary");
  });

  $("#menu-movies").click(function() {
    $("#animals").removeClass("panel-primary");
    $("#food").removeClass("panel-primary");
    $("#movies").addClass("panel-primary");
  });

});
