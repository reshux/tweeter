$(document).ready(function() {
  $("textarea")
    .keyup(function() {
      let value = $(this).val().length;
      $("span.counter").text(140 - value);
      if (140 - value < 0) {
        $("span.counter").css("color", "red");
      } else {
        $("span.counter").css("color", "black");
      }
    })
    .keyup();
});
