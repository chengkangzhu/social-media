import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return res
				.status(401)
				.json({ message: "No authorization header found" });
		}

		const token = authHeader.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "No token found" });
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
