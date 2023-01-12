const sql = require('./db.js');
const crypto = require('crypto');

// constructor
const User = function (user) {
	this.username = user.username;
	this.password = user.password;
	this.firstName = user.firstName;
	this.lastName = user.lastName;
	this.jobTitle = user.jobTitle;
	this.email = user.email;
	this.address = user.address;
	this.admin = user.admin;
	this.dateCreated = user.dateCreated;
	this.dateUpdated = user.dateUpdated;
};

User.create = (newUser, result) => {
	sql.query('INSERT INTO velox_users SET ?', newUser, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...newUser, password: null });
	});
};

User.getAll = (title, result) => {
	let query = 'SELECT * FROM velox_users';

	if (title) {
		query += ` WHERE title LIKE '%${title}%'`;
	}

	sql.query(query, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('tutorials: ', res);
		result(null, res);
	});
};

User.findById = (id, result) => {
	sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log('found user: ', res[0]);
			result(null, res[0]);
			return;
		}

		// not found User with the id
		result({ kind: 'not_found' }, null);
	});
};

User.getAllPublished = (result) => {
	sql.query('SELECT * FROM tutorials WHERE published=true', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('tutorials: ', res);
		result(null, res);
	});
};

User.updateById = (id, user, result) => {
	sql.query(
		'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?',
		[user.title, user.description, user.published, id],
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found User with the id
				result({ kind: 'not_found' }, null);
				return;
			}

			console.log('updated user: ', { id: id, ...user });
			result(null, { id: id, ...user });
		}
	);
};

User.remove = (id, result) => {
	sql.query('DELETE FROM tutorials WHERE id = ?', id, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found User with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('deleted user with id: ', id);
		result(null, res);
	});
};

User.removeAll = (result) => {
	sql.query('DELETE FROM tutorials', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} tutorials`);
		result(null, res);
	});
};

User.authenticate = ({ email, password }, result) => {
	sql.query(
		`SELECT id, firstName, lastName, admin, email, jobTitle, username, address FROM velox_users WHERE password="${password}" AND (email = "${email}" OR username = "${email}")`,
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log('found user: ', res[0]);
				result(null, res[0]);
				return;
			}

			// not found User with the id
			result({ kind: 'not_found' }, null);
		}
	);
};

//Encrypting text
User.hashPassword = (password) => {
	return crypto
		.pbkdf2Sync(password, '12345', 1000, 64, `sha512`)
		.toString(`hex`);
};

module.exports = User;
