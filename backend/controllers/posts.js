import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
	try {
		const { userId, description, picturePath } = req.body;
		const user = await User.findById(userId);

		const newPost = await Post.create({
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
		const { userId, description, picturePath } = req.body;
		const user = await User.findById(userId);

		const newPost = await Post.create({
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
		res.status(404).json({ message: err.message });
	}
};
export const getUserPosts = async (req, res) => {};

//UPDATE
export const LikePost = async (req, res) => {};
