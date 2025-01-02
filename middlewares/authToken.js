const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Retrieve token from cookies
        const token = req.cookies?.token;

        // If there's no token, return an error response
        if (!token) {
            return res.status(200).json({
                message: "Please log in first.",
                error: true,
                success: false
            });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.TOTAL_SECRET_KEY, (err, decoded) => {
            // Token verification failed (invalid or expired)
            if (err) {
                return res.status(403).json({
                    message: "Token is invalid or expired.",
                    error: true,
                    success: false
                });
            }

            // Token is valid, add decoded data to request object
            req.userId = decoded?._id;

            // Proceed to next middleware or route handler
            next();
        });

    } catch (err) {
        console.error("Error in authentication middleware:", err);
        return res.status(400).json({
            message: err.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
