const moment = require('moment');
const bcrypt = require('bcrypt');
const db = require('../config/database');

const findOne = async (data) => {
	try {
		let { email } = data.body;

		const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

		return user;
	} catch (error) {
		return error.message;
	}
};

const findEmail = async (data) => {
	try {
		let { email } = data.body;

		const user = await db.query('SELECT id, email FROM users WHERE email = $1', [email]);

		return user;
	} catch (error) {
		return error.message;
	}
};

const findUsername = async (data) => {
	try {
		let { username } = data.body;

		const user = await db.query('SELECT id, username FROM users WHERE username = $1', [username]);

		return user;
	} catch (error) {
		return error.message;
	}
};

const findAll = async () => {
	try {
		const user = await db.query('SELECT id, username, email FROM users');

		return user;
	} catch (error) {
		return error.message;
	}
};

const signup = async (data) => {
	try {
		let { username, email, password, full_name, bio } = data.body;

		const user = await db.query(
			'INSERT INTO users (username, email, password, salt, full_name, bio) VALUES ($1, $2, $3, $4, $5, $6)',
			[username, email, password, salt, full_name, bio],
		);

		return user;
	} catch (error) {
		return error.message;
	}
};

const updated = async (data) => {
	try {
		let { full_name, bio, userId } = data.body;

		const user = await db.query(
			'UPDATE users SET full_name = $1, bio = $2 WHERE id = $3 RETURNING full_name, bio',
			[full_name, bio, userId],
		);

		return user;
	} catch (error) {
		return error.message;
	}
};

const deleted = async (data) => {
	try {
		let { userId } = data.body;

		const user = await db.query('DELETE FROM users WHERE id = $1 RETURNING id, username', [userId]);

		return user;
	} catch (error) {
		return error.message;
	}
};

module.exports = {
	findOne,
	findEmail,
	findUsername,
	findAll,
	signup,
	updated,
	deleted,
};
