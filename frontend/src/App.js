import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";

//pages and compoentn
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";

function App() {
	const mode = useSelector((state) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const isAuth =  useSelector(state => state.token)

	return (
		<div className="app">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline>
						<Routes>
							<Route path="/" element={!isAuth ?<LoginPage /> :<Navigate to="/home" />} />
							<Route path="/home" element={isAuth ? <HomePage /> :<Navigate to="/" />} />
							<Route
								path="/profile/:userId"
								element={isAuth ? <ProfilePage /> :<Navigate to="/" />}
							/>
						</Routes>
					</CssBaseline>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
