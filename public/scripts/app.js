/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {
  const $tweet = $("<article>")
    .addClass("tweet")
    .append(
      $("<header>")
        .addClass("clearfix")
        .append(
          $("<img>")
            .addClass("avatar")
            .attr("src", tweet.user.avatars.small),
          $("<h2>")
            .addClass("username")
            .text(tweet.user.name),
          $("<span>")
            .addClass("handle")
            .text(tweet.user.handle)
        ),
      $("<p>").text(tweet.content.text),
      $("<footer>").append(
        $("<span>")
          .addClass("tweet-age")
          .text(tweet.created_at)
      )
    );
  return $tweet;
}

function renderTweets(data) {
  $("#tweet-container").empty();
  data.forEach(tweet => {
    let renderedTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(renderedTweet);
  });
}

function tweetValidation(data) {
  if (data.val().length === 0) {
    errorDisplay("empty");
    return false;
  } else if (data.val().length > 140) {
    errorDisplay("long");
    return false;
  }
  return true;
}

function errorDisplay(errorType) {
  if (errorType === "empty") {
    $("#msg-display").text("Empty tweet!");
  }
  if (errorType === "long") {
    $("#msg-display").text("Too long!");
  }
  if (errorType === null) {
    $("#msg-display").text("");
  }
}

function loadTweets() {
  $.ajax({
    type: "GET",
    url: "/tweets"
  }).done(function(response) {
    renderTweets(response);
  });
}

function createButton(nameTag) {
  const $button = $("<input>")
    .attr("id", nameTag)
    .attr("type", "submit")
    .attr("value", nameTag);
  $("#nav-bar").append($button);
}

$(document).ready(function() {
  loadTweets();
  $(".new-tweet").hide();
  createButton("Compose");
  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    if (tweetValidation($("#tweet-area"))) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).done(function(response) {
        // $("#tweet-container").empty();
        loadTweets();
      });
      errorDisplay(null);
      $("#tweet-area").val("");
      $("#counter").text(140);
    }
  });
  $("#Compose").on("click", function(event) {
    $(".new-tweet").slideToggle(function() {
      $("#tweet-area").focus();
    });
  });
});
