const jwt = require('jsonwebtoken');
const JWT_SECRET = "Vishruti vish";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; 
        next();
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });
    }
};

module.exports = fetchuser;
