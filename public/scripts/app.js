/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: {
        small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 2173613
  }
];

const tweetData = {
  user: {
    name: "Newton",
    avatars: {
      small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    handle: "@SirIsaac"
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1461116232227
};

$(document).ready(function() {
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
    let testTweets = [];
    data.forEach(tweet => {
      let renderedTweet = createTweetElement(tweet);
      $("#tweet-container").append(renderedTweet);
    });
  }
  renderTweets(data);
});
