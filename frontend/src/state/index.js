import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
	user: null,
	token: null,
	posts: [],
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.error("user friends does not exist");
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {

            //map through the posts and replace the target post with new post then update tthe state
			const updatedPosts = state.posts.map((post) => post._id === action.payload.post._id ? action.payload.post : post );
			state.posts = updatedPosts;
		},
	},
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
	authSlice.actions;
export default authSlice.reducer;
