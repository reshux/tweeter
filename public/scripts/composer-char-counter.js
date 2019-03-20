$(document).ready(function() {
  $("#tweet-area")
    .keyup(function() {
      let value = $(this).val().length;
      $("span.counter").text(140 - value);
      if (140 - value < 0) {
        $("span.counter").css("color", "red");
      } else {
        $("span.counter").css("color", "black");
      }
      if (value === 0) {
        $("span.counter").text(140);
      }
    })
    .keyup();
});
