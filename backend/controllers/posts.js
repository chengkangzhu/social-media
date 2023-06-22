import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
	try {
		const { userId, description, picturePath } = req.body;
		const user = await User.findById(userId);

		await Post.create({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			userPicturePath: user.picturePath,
			likes: {},
			comment: [],
			description,
			picturePath,
		});
		const post = await Post.find();
		res.status(201).json(post);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

//READ
export const getFeedPosts = async (req, res) => {
	try {
		const post = await Post.find();
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

//UPDATE
export const LikePost = async (req, res) => {
	try {
		const { id } = req.params;
		const {userId} = req.body;
		const post = await Post.findById(id);

		//check if the likes array have the userId
		const isLiked = post.likes.get(userId);

		//if the userid is in the post.like then remove it , vice versa
		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}


		//find the post and update with the local post that is already updated 
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes },
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};


export const likePost = async (req, res) => {
	try {
	  const { id } = req.params;
	  const { userId } = req.body;
	  const post = await Post.findById(id);
	  const isLiked = post.likes.get(userId);
  
	  if (isLiked) {
		post.likes.delete(userId);
	  } else {
		post.likes.set(userId, true);
	  }
  
	  const updatedPost = await Post.findByIdAndUpdate(
		id,
		{ likes: post.likes },
		{ new: true }
	  );
  
	  res.status(200).json(updatedPost);
	} catch (err) {
	  res.status(404).json({ message: err.message });
	}
  };