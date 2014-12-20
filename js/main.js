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

  $("form").submit(function (event) {
    event.preventDefault();

    var type = $("#type").val();
    var item = $("#item").val();
    $("#item").val("");

    var newHtml = "<li>" + item + "</li>";

    $("#" + type + " .favorite-list").append(newHtml);
  });

  $(".favorite-list").click(function (event) {
    var target = event.originalEvent.target
    $(target).remove();
  });
});
