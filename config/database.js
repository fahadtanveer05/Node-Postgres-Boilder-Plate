const { Pool } = require('pg');

const connectionString = process.env.DB_CONNECTION_URL;
// string = user:password@host:port/db_name

const pool = new Pool({
	connectionString,
});

pool
	.connect()
	.then(() => {
		console.log('Database connection established');
	})
	.catch((e) => console.error(e.stack));

module.exports = pool;
