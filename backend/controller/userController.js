require("dotenv").config();
const User = require("../models/User");

const BEARER = process.env.TWITTER_BEARER;

module.exports.register = async (req, res) => {
  const {
    id,
    linkedAccounts,
    twitterName,
    twitterUsername,
    twitterId,
    twitterPfp,
    createdAt,
  } = req.body;
  try {
    const user = new User({
      id,
      linkedAccounts,
      twitterName,
      twitterUsername,
      twitterId,
      twitterPfp,
      createdAt,
      nese: 0,
    });

    await user.save();
    req.session.userId = user._id;
    console.log(`Saved ${user}`);
    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

module.exports.me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Not logged in" });

  const user = await User.findById(req.session.userId).select("-passwordHash");
  res.status(200).json({ user });
};

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  const newId = `did:privy:${id}`;

  try {
    const user = await User.findOne({ id: newId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getTwitterIdByUsername = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    console.log("This is bearer token:", BEARER);
    const cleanUsername = username.replace("@", "");

    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER}`,
        },
      },
    );

    const text = await response.text();

    if (!response.ok) {
      console.error("Bad Twitter response:", text);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch user" });
    }

    const data = JSON.parse(text);
    console.log("✅ Twitter user data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};
