import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
	//state that changes the content of the page whent he url is different
	const [user, setUser] = useState(null);

	//get the profileId from the url
	const { userId } = useParams();
	const token = useSelector((state) => state.token);
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

	const loggedInUser = useSelector((state) => state.user);

	//get all info on the user to display on user widget
	const getUser = async () => {
		const response = await fetch(`http://localhost:3001/user/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setUser(data);
	};

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!user) return null;

	return (
		<Box>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="2rem"
				justifyContent="center"
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					{/* the left column */}

					{/* shows the user information  */}
					<UserWidget
						userId={userId}
						picturePath={user.picturePath}
					/>
					{/* <Box m="2rem 0" /> margin top  */}

					<Box mt="2rem">
						<FriendListWidget userId={userId} />
					</Box>
				</Box>

				{/* change the alignment on mobile device  */}
				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}
				>
					{/* still allow you to post stuff  */}
					<MyPostWidget picturePath={loggedInUser.picturePath} />
					<Box mt="2rem">
						<PostsWidget userId={userId} isProfile={true} />
						
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ProfilePage;
