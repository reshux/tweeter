// This function creates the necessary DOM tree for a tweet
// to display properly. I know that we could use ES6 conventions
// to simply carryover some HTML code but I wanted to do it this
// way to practice jQuery;
// const moment = require("./moment.js");

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
          .text(moment(tweet.created_at).fromNow()),
        $("<div>")
          .addClass("icons")
          .append(
            $("<i>")
              .addClass("tiny")
              .addClass("material-icons")
              .text("flag"),
            $("<i>")
              .addClass("tiny")
              .addClass("material-icons")
              .text("repeat"),
            $("<i>")
              .addClass("tiny")
              .addClass("material-icons")
              .text("favorite")
          )
      )
    );
  return $tweet;
}

// Helper function to list formatted tweets on "timeline"
// in the correct order: youngest tweet to oldest;
function renderTweets(data) {
  $("#tweet-container").empty();
  data.forEach(tweet => {
    let renderedTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(renderedTweet);
  });
}

// The two functions below go together. First is to
// check if the submitted tweet's length is valid
// and the second is to display the right error message
// when necessary;
function tweetValidation(data) {
  if (
    data.val().length === 0 ||
    (data.val()[0] === " " || data.val()[1] === " ")
  ) {
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

// Dynamically creates a button in nav-bar when called;
function createButton(nameTag) {
  const $button = $("<input>")
    .attr("id", nameTag)
    .attr("type", "submit")
    .attr("value", nameTag);
  $("#nav-bar").append($button);
}

$(document).ready(function() {
  // We start by loading tweets that are already in the database
  $.ajax({
    type: "GET",
    url: "/tweets"
  }).done(function(response) {
    renderTweets(response);
  });
  // Hide the compose tweet box
  $(".new-tweet").hide();
  // Create a compose tweet button
  createButton("Compose");
  // When the button is clicked; compose tweet box slides down
  $("#Compose").on("click", function(event) {
    $(".new-tweet").slideToggle(function() {
      $("#tweet-area").focus();
    });
  });
  // 1- When the tweet is submitted an AJAX post request is made
  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    if (tweetValidation($("#tweet-area"))) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).done(function(response) {
        $.ajax({
          type: "GET",
          url: "/tweets"
        }).done(function(response) {
          renderTweets(response);
        });
      });
      // Tweets in the database are reloaded to "timeline"
      // Any error message displayed in tweet box is cleared
      errorDisplay(null);
      // Tweet box form is reset
      $("#tweet-area").val("");
      // Counter is reset back to 140
      $("#counter").text(140);
    }
  });
});
