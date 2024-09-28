const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const headertoken = req.headers["authorization"];
   
    const token = headertoken.split(" ")[1];
  
    


    if (!token) {
        return res.status(403).json({
            message: "Unauthorized Access",
            valid: false

        });
    }

    try {
        const decode = jwt.verify(token, 'shhhh');
        req.user = decode;


        next();
    } catch (error) {
        return res.status(401).json({ message: "Token Mismatch" });
    }
};

module.exports = auth;
