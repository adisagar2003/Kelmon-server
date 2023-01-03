const jwt = require('jsonwebtoken');
require('dotenv').config();
const generate_token = async (payload) => {
    const token = await jwt.sign(JSON.stringify(payload),process.env.JWT_SECRET);
    return token
}

module.exports = generate_token;