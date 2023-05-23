const express = require('express');
require('dotenv').config();

const db = require('./config/database.js');

const userRoute = require('./route/user.route');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoute);

(async () => {
	const query = await db.query('SELECT NOW()');
	console.log(query.rows);
})();

module.exports = app;
