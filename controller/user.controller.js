const jwt = require('jsonwebtoken');
const {
	findOne,
	findEmail,
	findUsername,
	findAll,
	signup,
	updated,
	deleted,
} = require('../model/user.model');
const response = require('../common/response');
const { passwordValidator, hash } = require('../helper/index');

const searchAllUsers = async (req, res) => {
	try {
		let users = await findAll();

		if (users.rows.length === 0) {
			return response.badRequestResponse('No user exists', res);
		}

		users = users.rows;

		response.successResponse(true, users, res);
	} catch (error) {
		response.serverFailureResponse(error.message, res);
		throw new Error(error);
	}
};

const userSignup = async (req, res) => {
	try {
		// checking duplicate email
		let email = await findEmail(req);

		if (email.rows.length > 0) {
			console.log('email found');
			return response.badRequestResponse('User with provided email already exists', res);
		}

		// checking duplicate username
		let username = await findUsername(req);

		if (username.rows.length > 0) {
			console.log('username found');
			return response.badRequestResponse('User with provided username already exists', res);
		}

		// hashing password using helper function
		req.body.password = await hash(req.body.password);

		// inserting new user
		let user = await signup(req);

		if (!user.rowCount) {
			return response.badRequestResponse(user, res);
		}

		response.successResponse(true, 'User signed up', res);
	} catch (error) {
		response.serverFailureResponse(error.message, res);
		throw new Error(error);
	}
};

const userLogin = async (req, res) => {
	try {
		let user = await findOne(req);

		if (user.rows.length === 0) {
			return response.badRequestResponse('No user with provided email exists', res);
		}

		user = user.rows[0];
		user.req_password = req.body.password;

		// comparing if password matches with existing hash using helper function
		isMatch = await passwordValidator(user);

		if (!isMatch) {
			return response.badRequestResponse('Incorrect credentials', res);
		}

		let data = {
			id: user.id.toString(),
			username: user.username,
			email: user.email,
		};

		let token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
			expiresIn: '1h',
		});

		response.successResponse(true, token, res);
	} catch (error) {
		response.serverFailureResponse(error.message, res);
		throw new Error(error);
	}
};

const userUpdate = async (req, res) => {
	try {
		// extracting authenticated id from res and storing in req body
		req.body.userId = res.locals.decoded.id;

		let user = await updated(req);

		if (!user.rowCount) {
			return response.badRequestResponse('Cant update user', res);
		}

		user = user.rows;

		response.successResponse(true, user, res);
	} catch (error) {
		response.serverFailureResponse(error.message, res);
		throw new Error(error);
	}
};

const userDelete = async (req, res) => {
	try {
		// extracting authenticated id from res and storing in req body
		req.body.userId = res.locals.decoded.id;

		let user = await deleted(req);

		if (!user.rowCount) {
			return response.badRequestResponse('Cant delete user', res);
		}

		user = user.rows;

		response.successResponse(true, `User ${user.username} deleted`, res);
	} catch (error) {
		response.serverFailureResponse(error.message, res);
		throw new Error(error);
	}
};

module.exports = {
	searchAllUsers,
	userSignup,
	userLogin,
	userUpdate,
	userDelete,
};
