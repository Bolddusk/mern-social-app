const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
// Create a post
router.post("/", async (req, res) => {
  if (!req.body.userId || !req.body.description)
    res.status(400).json("userId or Description is missing.");

  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong!");
  }
});
// Update a post
router.put("/:postId", async (req, res) => {
  try {
    // Check if userId & description is present
    if (!req.body.userId || !req.body.description)
      res.status(400).json("userId or description is missing");

    const post = await Post.findById(req.params.postId);
    // Check if post exists
    if (!post) res.status(404).json("Post not found");

    // Verify the post owner
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can only update your post!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
});
// Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    // Check if userId & description is present
    if (!req.body.userId) res.status(400).json("userId");

    const post = await Post.findById(req.params.postId);
    // Check if post exists
    if (!post) return res.status(404).json("Post not found");

    // Verify the post owner
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can only delete your post!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
});
// Like a post
router.put("/:postId/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json("Post not found");


    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.json("Post has been Unliked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Unfortunately! Something went wrong.");
  }
});

// Get a post
router.get("/:postid", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);

    if (!post) return res.status(404).json("Post not found");

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Unfortunately! Something went wrong");
  }
});
// Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    if (!req.params.userId) return res.status(404).json("User not found!");

    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId : currentUser._id})
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId)=>{
        return Post.find({userId : friendId})
      })
    )
    res.json(userPosts.concat(...friendPosts));
    
  } catch (err) {
    console.log(err);
    return res.status(500).json("Unfortunately! Something went wrong");
  }
});
// Get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    if (!req.params.username) return res.status(404).json("User not found!");

    const user = await User.findOne({username:req.params.username});
    const posts = await Post.find({userId: user._id})
    res.status(200).json(posts);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json("Unfortunately! Something went wrong");
  }
});
module.exports = router;
