import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

//MATERIAL UI
import {
	EditOutlined,
	DeleteOutlined,
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from "@mui/icons-material";

import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	Button,
	IconButton,
	useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";

//COMPONENT AND WIDGET
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const MyPostWidget = ({ picturePath }) => {
	//fucntion to send action to chagne the redux global state 
	const dispatch = useDispatch();

	//a state to toggle the image dropzone 
	const [isImage, setIsImage] = useState(false);

	//use to store the image path 
	const [image, setImage] = useState(null);

	//set the description of the post
	const [post, setPost] = useState("");

	//get the color from mui
	const { palette } = useTheme();

	//grab the user id from redux state
	const { _id } = useSelector((state) => state.user);

	//grab the token from the redux state 
	const token = useSelector((state) => state.token);

	//a state for toggleing between mobile  and laptops || true if the device is atleast 1000px width
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

	//get the color from the palette for easier to use 
	const mediumMain = palette.neutral.mediumMain;
	const medium = palette.neutral.medium;


	// fucntion that posts the infromation ( userId, postDescription, image and image path) to the databse, deals with the authorziation as well 
	// when we get the response back from the server, we update this to the redux state so there is no need to refetech the whole databse for one post update,  
	const handlePost = async () => {
		const formData = new FormData();
		formData.append("userId", _id);
		formData.append("description", post);
		if (image) {
			formData.append("picture", image);
			formData.append("picturePath", image.name);
		}

		for (const entry of formData.entries()) {
			console.log(entry);
		  }

		const response = await fetch(`http://localhost:3001/posts`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			body: formData,
		});

		const posts = await response.json();
		dispatch(setPosts({ posts }));
		setImage(null);
		setPost("");
		setIsImage(null)
	};

	return (
		<WidgetWrapper>

			{/*  first row of this widget that contain the user image and the input for the descripotion  */}
			<FlexBetween gap="1.5rem">
				<UserImage image={picturePath} />

				{/* update the post state to input */}
				<InputBase
					placeholder="What's on your mind"
					onChange={(e) => setPost(e.target.value)}
					value={post}
					sx={{
						width: "100%",
						backgroundColor: palette.neutral.light,
						borderRadius: "2rem",
						padding: "1rem 2rem",
					}}
				/>
			</FlexBetween>


			{/*  a dropzone that onnly show when the user want to add a image by clicking the image button (which toggles the isImage) */}
			{isImage && (

				// a simple box to style the image drop zone 
				<Box
					border={`1px solid ${medium}`}
					borderRadius="5px"
					mt="1rem"
					p="1rem"
				>

					{/* a third party component that helps with  */}
					<Dropzone
						acceptedFiles=".jpg,.jpeg,.png"
						multiple={false}
						onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
					>
						{({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dashed ${palette.primary.main}`}
									p="1rem"
									width="100%"
									sx={{
										"&:hover": {
											cursor: "pointer",
										},
									}}
								>

									<input {...getInputProps()} />

									{/* if there is no image then show the placeholder text */}
									{!image ? (
										<p>Add Image Here</p>
									) : (
										// if there is image then show the name of the image and the editicon
										<FlexBetween>
											<Typography>
												{image.name}
											</Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>

								{/* if image is selected there there would be a delete icon which sets the image to null */}
								{image && (
									<IconButton
										onclick={() => setImage(null)}
										sx={{ width: "15%" }}
									>
										<DeleteOutlined />
									</IconButton>
								)}
							</FlexBetween>
						)}
					</Dropzone>
				</Box>
			)}


			<Divider sx={{ margin: "1.25rem 0" }} />

			{/* spread the five buttons evenly */}
			<FlexBetween>

				{/* image button || toggles the isImage boolean value to show the dropzone  */}
				<FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
					<ImageOutlined sx={{ color: mediumMain }} />
					<Typography
						color={mediumMain}
						sx={{
							"&:hover": {
								cursor: "pointer",
								color: medium,
							},
						}}
					>
						Image
					</Typography>
				</FlexBetween>

				{/*  responsive code to replace the 3 unnecessary button with 3dots that drops the button when clicked  */}
				{isNonMobileScreens ? (
					<>
						<FlexBetween gap="0.25rem">
							<GifBoxOutlined sx={{ color: mediumMain }} />
							<Typography
								color={mediumMain}
								sx={{
									"&:hover": {
										cursor: "pointer",
										color: medium,
									},
								}}
							>
								Clip
							</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem">
							<AttachFileOutlined sx={{ color: mediumMain }} />
							<Typography
								color={mediumMain}
								sx={{
									"&:hover": {
										cursor: "pointer",
										color: medium,
									},
								}}
							>
								Attachment
							</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem">
							<MicOutlined sx={{ color: mediumMain }} />
							<Typography
								color={mediumMain}
								sx={{
									"&:hover": {
										cursor: "pointer",
										color: medium,
									},
								}}
							>
								Audio
							</Typography>
						</FlexBetween>
					</>
				) : (
					<FlexBetween gap="0.25rem">
						<MoreHorizOutlined sx={{ color: mediumMain }} />
					</FlexBetween>
				)}

				<Button
					disabled={!post}
					onClick={handlePost}
					sx={{
						color: palette.background.alt,
						backgroundColor: palette.primary.main,
						borderRadius: "3rem",
					}}
				>
					POST
				</Button>
			</FlexBetween>
		</WidgetWrapper>
	);
};

export default MyPostWidget;
