var changeBadgeCount = function(type, value) {
    var count = $("#menu-" + type + " .badge").text();
    count = parseInt(count) + value;
    $("#menu-" + type + " .badge").text(count);
};

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

    if (item === "") {
      $("#item-error").show();
      return;
    }
    $("#item-error").hide();

    $("#item").val("");

    var newHtml = "<li>" + item + "</li>";

    $("#" + type + " .favorite-list").append(newHtml);

    changeBadgeCount(type, 1);
  });

  $(".favorite-list").click(function (event) {
    var target = event.originalEvent.target

    var type = $(target).closest(".panel").attr("id")

    changeBadgeCount(type, -1);

    $(target).remove();
  });
});
