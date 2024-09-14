import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.auth_token;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token not provided.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error("Error in authentication", err);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};
