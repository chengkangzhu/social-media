import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			reequired: true,
		},
		firstName: {
			type: String,
			reequired: true,
		},
		lastName: {
			type: String,
			reequired: true,
		},
		location: String,
		description: String,
		picturePath: String,
		userPicturePath: String,
		likes: {
			type: Map,
			of: Boolean,
		},
		comments: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
