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
  data.forEach(tweet => {
    let renderedTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(renderedTweet);
  });
}

function tweetValidation(data) {
  if (data.val().length === 0) {
    alert("Can not post empty tweet!");
    return false;
  } else if (data.val().length > 140) {
    alert("Tweet is too long!");
    return false;
  }
  return true;
}

function loadTweets() {
  $.ajax({
    type: "GET",
    url: "/tweets"
  }).done(function(response) {
    renderTweets(response);
  });
}

$(document).ready(function() {
  loadTweets();
  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    if (tweetValidation($("textarea"))) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).done(function(response) {
        $.ajax({
          type: "GET",
          url: "/tweets"
        }).done(function(response) {
          loadTweets(response);
        });
      });
    }
  });
});
