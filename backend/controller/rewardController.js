// const fetch = require("node-fetch");
require("dotenv").config();
const User = require("../models/User"); // if using MongoDB

const BEARER = process.env.TWITTER_BEARER;

// UTIL: Get latest tweets for user
const fetchLatestTweets = async (userId) => {
  const res = await fetch(
    `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=conversation_id,text`,
    {
      headers: {
        Authorization: `Bearer ${BEARER}`,
      },
    },
  );
  const json = await res.json();
  return json.data || [];
};

// UTIL: Get replies to a tweet
const fetchReplies = async (tweetId) => {
  const res = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${tweetId}&tweet.fields=author_id`,
    {
      headers: {
        Authorization: `Bearer ${BEARER}`,
      },
    },
  );
  const json = await res.json();
  return json.data || [];
};

// UTIL: Check if user engaged with replies
const checkEngagement = async (userId, replies) => {
  for (const reply of replies) {
    // Check likes
    const likedRes = await fetch(
      `https://api.twitter.com/2/tweets/${reply.id}/liking_users`,
      {
        headers: {
          Authorization: `Bearer ${BEARER}`,
        },
      },
    );
    const likers = await likedRes.json();
    if (likers.data?.some((u) => u.id === userId)) return true;

    // Check sub-replies
    const replyRes = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${reply.id}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER}`,
        },
      },
    );
    const replyData = await replyRes.json();
    if (replyData.data?.some((r) => r.author_id === userId)) return true;
  }

  return false;
};

module.exports.rewardUser = async (req, res) => {
  const twitterId = req.params.id;

  try {
    const tweets = await fetchLatestTweets(twitterId);
    console.log("This is my tweets", tweets);
    let totalReward = 0;

    for (const tweet of tweets) {
      if (tweet.text.includes("@overtake_world")) {
        totalReward += 0.001;

        const replies = await fetchReplies(tweet.id);
        const engaged = await checkEngagement(twitterId, replies);

        if (engaged) {
          totalReward += 0.05;
        }
      }
    }

    // Optional: Save to DB
    await User.findOneAndUpdate({ twitterId }, { $inc: { nese: totalReward } });

    return res.status(200).json({
      message: "Reward calculated successfully",
      reward: totalReward,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to calculate reward" });
  }
};
