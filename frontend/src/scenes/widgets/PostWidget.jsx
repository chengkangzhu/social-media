//react and redux
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

//icons and material ui compoennts
import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

//component and widgets
import Friend from "components/Friend";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

//destruct the props receieved from PostsWidget
const PostWidget = ({
	postId,
	postUserId,
	name,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	//a state for if comment is opened or close
	const [isComments, setIsComments] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);

	//get the user id
	const loggedInUserId = useSelector((state) => state.user._id);

	//if the current user like a post or not

	const isLiked = Boolean(likes && likes[loggedInUserId]);
	const likeCount = Object.keys(likes || {}).length;

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const primary = palette.primary.main;

	//handle the changes to the like (either like, or unlike)
	//send a patch request to the server with the postID and the userID that like that post (which is the current person that is logged in )

	const patchLike = async () => {
		const response = await fetch(
			`http://localhost:3001/posts/${postId}/like`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: loggedInUserId }),
			}
		);

		//get the updated post and update the redux state
		const updatedPost = await response.json();
		dispatch(setPost({ post: updatedPost }));
	};

	return (
		<WidgetWrapper m="2rem 0">
			{/* display the person that post that post  */}
			<Friend
				friendId={postUserId}
				name={name}
				subtitle={location}
				userPicturePath={userPicturePath}
			/>

			{/* description of the post  */}
			<Typography color={main} sx={{ mt: "1rem" }}>
				{description}
			</Typography>

			{/* show picture if there is picture  */}
			{picturePath && (
				<img
					width="100%"
					height="auto"
					alt="post"
					style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
					src={`http://localhost:3001/assets/${picturePath}`}
				/>
			)}

			<FlexBetween mt="0.25rem">
				{/* the button row of the post that contains the like and comment */}
				<FlexBetween gap="1rem">

					{/* flexbetween for the like icon and the like count */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={patchLike}>
							{isLiked ? (
								<FavoriteOutlined sx={{ color: primary }} />
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>

					{/* show the comment button  */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={() => setIsComments(!isComments)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>

				{/* share button  */}
				<IconButton>
					<ShareOutlined />
				</IconButton>
			</FlexBetween>

			{/* show the comment section when clicked */}
			{isComments && (
				<Box mt="0.5rem">
					{comments.map((comment, i) => (
						<Box key={`${name}-${i}`}>
							<Divider />
							<Typography
								sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}
							>
								{comment}
							</Typography>
						</Box>
					))}
					<Divider />
				</Box>
			)}
		</WidgetWrapper>
	);
};

export default PostWidget;
// import {
// 	ChatBubbleOutlineOutlined,
// 	FavoriteBorderOutlined,
// 	FavoriteOutlined,
// 	ShareOutlined,
//   } from "@mui/icons-material";
//   import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
//   import FlexBetween from "components/FlexBetween";
//   import Friend from "components/Friend";
//   import WidgetWrapper from "components/WidgetWrapper";
//   import { useState } from "react";
//   import { useDispatch, useSelector } from "react-redux";
//   import { setPost } from "state";

//   const PostWidget = ({
// 	postId,
// 	postUserId,
// 	name,
// 	description,
// 	location,
// 	picturePath,
// 	userPicturePath,
// 	likes,
// 	comments,
//   }) => {
// 	const [isComments, setIsComments] = useState(false);
// 	const dispatch = useDispatch();
// 	const token = useSelector((state) => state.token);
// 	const loggedInUserId = useSelector((state) => state.user._id);
// 	const isLiked = Boolean(likes[loggedInUserId]);
// 	const likeCount = Object.keys(likes).length;

// 	const { palette } = useTheme();
// 	const main = palette.neutral.main;
// 	const primary = palette.primary.main;

// 	const patchLike = async () => {
// 	  const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
// 		method: "PATCH",
// 		headers: {
// 		  Authorization: `Bearer ${token}`,
// 		  "Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({ userId: loggedInUserId }),
// 	  });
// 	  const updatedPost = await response.json();
// 	  dispatch(setPost({ post: updatedPost }));
// 	};

// 	return (
// 	  <WidgetWrapper m="2rem 0">
// 		<Friend
// 		  friendId={postUserId}
// 		  name={name}
// 		  subtitle={location}
// 		  userPicturePath={userPicturePath}
// 		/>
// 		<Typography color={main} sx={{ mt: "1rem" }}>
// 		  {description}
// 		</Typography>
// 		{picturePath && (
// 		  <img
// 			width="100%"
// 			height="auto"
// 			alt="post"
// 			style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
// 			src={`http://localhost:3001/assets/${picturePath}`}
// 		  />
// 		)}
// 		<FlexBetween mt="0.25rem">
// 		  <FlexBetween gap="1rem">
// 			<FlexBetween gap="0.3rem">
// 			  <IconButton onClick={patchLike}>
// 				{isLiked ? (
// 				  <FavoriteOutlined sx={{ color: primary }} />
// 				) : (
// 				  <FavoriteBorderOutlined />
// 				)}
// 			  </IconButton>
// 			  <Typography>{likeCount}</Typography>
// 			</FlexBetween>

// 			<FlexBetween gap="0.3rem">
// 			  <IconButton onClick={() => setIsComments(!isComments)}>
// 				<ChatBubbleOutlineOutlined />
// 			  </IconButton>
// 			  <Typography>{comments.length}</Typography>
// 			</FlexBetween>
// 		  </FlexBetween>

// 		  <IconButton>
// 			<ShareOutlined />
// 		  </IconButton>
// 		</FlexBetween>
// 		{isComments && (
// 		  <Box mt="0.5rem">
// 			{comments.map((comment, i) => (
// 			  <Box key={`${name}-${i}`}>
// 				<Divider />
// 				<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
// 				  {comment}
// 				</Typography>
// 			  </Box>
// 			))}
// 			<Divider />
// 		  </Box>
// 		)}
// 	  </WidgetWrapper>
// 	);
//   };

//   export default PostWidget;
