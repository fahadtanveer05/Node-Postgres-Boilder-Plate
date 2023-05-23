const bcrypt = require('bcrypt');

const hash = async (password) => {
	try {
		salt = await bcrypt.genSalt();
		password = await bcrypt.hash(password, salt);

		return password;
	} catch (error) {
		return error.message;
	}
};

const passwordValidator = async (data) => {
	try {
		let { req_password, salt, password } = data;
		const hash = await bcrypt.hash(req_password, salt); // using the salt of the saved user on incoming password
		return hash === password; // if hash matches we get true, else false
	} catch (error) {
		return error.message;
	}
};

module.exports = {
	hash,
	passwordValidator,
};
