const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content, groupId, imageUrl: bodyImageUrl } = req.body;

    const imageUrl = bodyImageUrl || (req.file && req.file.path);

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newPostData = {
      title,
      content,
      imageUrl,
      author: req.user._id,
    };

    if (groupId) {
      newPostData.group = groupId;
    }

    const post = await Post.create(newPostData);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

const assignToGroup = async (req, res) => {
  try {
    const { postId } = req.params;
    const { groupId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    if (!post.author || post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to assign this post" });
    }

    post.group = groupId;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("assignToGroup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  assignToGroup,
};
