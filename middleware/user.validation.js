const Joi = require('joi');
const response = require('../common/response');

const signupValidation = async (req, res, next) => {
	try {
		const schema = Joi.object({
			username: Joi.string().min(2).max(50).trim(true).required().messages({
				'string.min': 'Username should be at least 2 characters long',
				'string.max': 'Username should be at most 50 characters long',
				'string.empty': 'Username is required',
			}),

			email: Joi.string().max(50).lowercase().email().required().messages({
				'string.max': 'Email should be at most 50 characters long',
				'string.empty': 'Email is required',
			}),

			password: Joi.string().min(6).max(100).trim(true).required().messages({
				'string.min': 'Password should be at least 6 characters long',
				'string.max': 'Password should be at most 100 characters long',
				'string.empty': 'Password is required',
			}),

			full_name: Joi.string().min(2).max(100).trim(true).required().messages({
				'string.min': 'Full Name should be at least 2 characters long',
				'string.max': 'Full Name should be at most 100 characters long',
				'string.empty': 'Full Name is required',
			}),

			bio: Joi.string().min(2).max(255).trim(true).required().messages({
				'string.min': 'Bio should be at least 2 characters long',
				'string.max': 'Bio should be at most 255 characters long',
				'string.empty': 'Bio is required',
			}),
		}).options({ abortEarly: false });

		const { error, value } = schema.validate(req.body);

		if (error) {
			return response.validationErrorRequestResponse(error.message, res);
		} else {
			req.body = value;
			next();
		}
	} catch (error) {
		response.serverFailureResponse(error.message, res);
	}
};

const loginValidation = async (req, res, next) => {
	try {
		const schema = Joi.object({
			email: Joi.string().max(50).lowercase().email().required().messages({
				'string.max': 'Email should be at most 50 characters long',
				'string.empty': 'Email is required',
			}),

			password: Joi.string().min(6).max(100).trim(true).required().messages({
				'string.min': 'Password should be at least 6 characters long',
				'string.max': 'Password should be at most 100 characters long',
				'string.empty': 'Password is required',
			}),
		}).options({ abortEarly: false });

		const { error, value } = schema.validate(req.body);

		if (error) {
			return response.validationErrorRequestResponse(error.message, res);
		} else {
			req.body = value;
			next();
		}
	} catch (error) {
		response.serverFailureResponse(error.message, res);
	}
};

const updateValidation = async (req, res, next) => {
	try {
		const schema = Joi.object({
			full_name: Joi.string().min(2).max(100).trim(true).required().messages({
				'string.min': 'Full Name should be at least 2 characters long',
				'string.max': 'Full Name should be at most 255 characters long',
				'string.empty': 'Full Name is required',
			}),

			bio: Joi.string().min(2).max(255).trim(true).required().messages({
				'string.min': 'Bio should be at least 2 characters long',
				'string.max': 'Bio should be at most 255 characters long',
				'string.empty': 'Bio is required',
			}),
		}).options({ abortEarly: false });

		const { error, value } = schema.validate(req.body);

		if (error) {
			return response.validationErrorRequestResponse(error.message, res);
		} else {
			req.body = value;
			next();
		}
	} catch (error) {
		response.serverFailureResponse(error.message, res);
	}
};

const paramsValidation = async (req, res, next) => {
	try {
		const schema = Joi.object({
			id: Joi.number().integer().required(),
		}).options({ abortEarly: false });

		const { error, value } = schema.validate(req.params);

		if (error) {
			return response.validationErrorRequestResponse(error.message, res);
		} else {
			req.params = value;
			next();
		}
	} catch (error) {
		response.serverFailureResponse(error.message, res);
	}
};

module.exports = {
	signupValidation,
	loginValidation,
	updateValidation,
};
