import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation,
		} = req.body;

		const passwordHash = await bcrypt.hash(
			password,
			await bcrypt.genSalt()
		);

		const savedUser = await User.create({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});

		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			res.status(400).json({ message: "User does not exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});
		delete user.password;
		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
