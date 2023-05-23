const jwt = require('jsonwebtoken');
const response = require('../common/response');

const auth = async (req, res, next) => {
	try {
		const bearerToken = req.header('Authorization');

		if (bearerToken) {
			const splitToken = bearerToken.split(' ');

			const token = splitToken[1];

			if (token) {
				jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
					if (err) {
						if (err.name === 'TokenExpiredError') {
							return response.invalidTokenRequestResponse('Expired token', res);
						} else {
							return response.invalidTokenRequestResponse('Invalid token', res);
						}
					} else {
						res.locals.decoded = decoded;
						next();
					}
				});
			}
		} else {
			return response.invalidTokenRequestResponse('No token provided', res);
		}
	} catch (error) {
		response.serverFailureResponse(error.message, res);
	}
};

module.exports = {
	auth,
};
