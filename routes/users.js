const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { route } = require("./auth");

// Update user
router.put("/:id", async (req, res) => {
  if (!req.body.userId) return res.status(400).json("userId is missing!");

  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // encrypt password if
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.log(err);
        return res.status(500).json("Something went wrong");
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      return res.status(200).json("Account updated");
    } catch (err) {
      console.log(err);
      return res.status(500).json("Something went wrong!");
    }
  } else {
    return res.status(403).json("You can only update your account!");
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  if (!req.body.userId) res.status(400).json("UserId is required.");

  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.body.userId);
      res.status(200).json("Account has been deleted!");
    } catch (err) {
      console.log(err);
      res.status(500).json("Something went Wrong!");
    }
  } else {
    res.status(403).json("You're not allowed to delete this account.");
  }
});

// Get user
// ?username=
// ?userId
router.get("/", async (req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong!");
  }
});

// Follow user
router.put("/:id/follow", async (req, res) => {
  if (!req.body.userId) res.status(400).json("userId is required");

  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(400).json("User not found!");

      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });

        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("already following this user.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Something went wrong!");
    }
  } else {
    res.status(400).json("You can't follow yourself!");
  }
});

// Get Friends/Followings
router.get("/friends/:userId", async (req, res) => {
  try {
    if (!req.params.userId) return res.status(204).json("UserId is required");

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json("User not found!");
    }

    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendsList.push({ _id, username, profilePicture });
    });

    return res.status(200).json(friendsList);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

// Unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (!req.body.userId) res.status(400).json("userId is required.");

  if (req.body.userId === req.params.id)
    return res.status(400).json("You can't follow and unfollow yourself");

  const user = await User.findById(req.params.id);
  if (!user) res.status(400).json("User not found");

  const currentUser = await User.findById(req.body.userId);
  if (currentUser.followings.includes(req.params.id)) {
    await user.updateOne({ $pull: { followers: req.body.userId } });
    await currentUser.updateOne({ $pull: { followings: req.params.id } });

    res.status(200).json("user has been unfollowed");
  } else {
    res.status(400).json("User wasn't being followed!");
  }

  try {
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong!");
  }
});

module.exports = router;
