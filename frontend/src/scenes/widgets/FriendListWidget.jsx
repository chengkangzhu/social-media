//react redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

// mui
import { Box, Typography, useTheme } from "@mui/material";

//widget and components
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

const FriendListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);
	

	//   functiton that gets all friend of user from server
	const getFriends = async () => {
        const response = await fetch(
          `http://localhost:3001/user/${userId}/friends`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
	};


	useEffect(() => {
		getFriends();
         // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<WidgetWrapper>
			{/* widget header  */}
			<Typography
				color={palette.neutral.dark}
				variant="h5"
				fontWeight="500"
				sx={{ mb: "1.5rem" }}
			>
				Friend List
			</Typography>

			{/* list of friends  */}
			<Box display="flex" flexDirection="column" gap="1.5rem">
				{friends.length > 0 ? (
					friends.map((friend) => (
						<Friend
							key={friend._id}
							friendId={friend._id}
							name={`${friend.firstName} ${friend.lastName}`}
							subtitle={friend.occupation}
							userPicturePath={friend.picturePath}
						/>
					))
				) : (
					<Typography>No friends found.</Typography>
				)}
			</Box>
		</WidgetWrapper>
	);
};

export default FriendListWidget;
