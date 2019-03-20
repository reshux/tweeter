$(document).ready(function() {
  $("#tweet-area")
    .keyup(function() {
      let value = $(this).val().length;
      $("#counter").text(140 - value);
      if (140 - value < 0) {
        $("#counter").css("color", "red");
      } else {
        $("#counter").css("color", "black");
      }
    })
    .keyup();
});
