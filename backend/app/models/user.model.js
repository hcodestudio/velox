const sql = require('./db.js');
const crypto = require('crypto');
const iterations = 4096;
const keylen = 32;
const randomDataSize = 16;
const pwd = 'myPwd';
const salt = 'secretK3yV3loX!';

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

		result(null, { id: res.insertId, password: null });
	});
};

User.saveUsersUserGroups = (data, result) => {
	sql.query(
		'INSERT INTO velox_usergroups_users (groupId, userId, dateCreated, dateUpdated) VALUES ?',
		[data],
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(err, null);
				return;
			}

			result(null, { id: res.insertId });
		}
	);
};

User.getAllUsers = (title, result) => {
	let query =
		'SELECT id, username, firstName, lastName, jobTitle, dateCreated, dateUpdated FROM velox_users';

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

User.getAllUserGroups = (handle, result) => {
	let query = 'SELECT * FROM velox_usergroups';

	if (handle) {
		query += ` WHERE handle LIKE '%${handle}%'`;
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

User.findUserById = (id, result) => {
	sql.query(`SELECT * FROM velox_users WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			const user = res[0];
			let userGroups = [];

			// get usergroups
			sql.query(
				`SELECT * FROM velox_usergroups_users WHERE userId = ${id}`,
				(err, res) => {
					if (err) {
						console.log('error: ', err);
						result(err, null);
						return;
					}

					if (res.length) {
						// get usergroups
						console.log('found user: ', user);

						userGroups = res.map((group) => [group.groupId]);

						result(null, { ...user, userGroups });
						return;
					}
					// not found User with the id
					result({ kind: 'not_found' }, null);
				}
			);
		}
	});
};

User.updateById = (id, user, result) => {
	sql.query(
		`UPDATE velox_users SET username = ?, firstName = ?, lastName = ?, jobTitle = ?, email = ?, address = ?, admin = ?, dateUpdated = ? WHERE id = ?`,
		[
			user.username,
			user.firstName,
			user.lastName,
			user.jobTitle,
			user.email,
			user.address,
			user.admin,
			user.dateUpdated,
			id,
		],
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
				let userData = {
					...res[0],
					userGroups: [],
					permissions: [],
				};

				let userGroupIds = [];

				// get usergroups
				sql.query(
					`SELECT a.groupId, b.name, b.handle FROM velox_usergroups_users as a INNER JOIN  velox_usergroups as b WHERE a.groupId = b.id AND a.userId = ${userData.id}`,
					(err, res) => {
						if (res.length) {
							userData.userGroups = res.map((group) => {
								userGroupIds.push(group.groupId);

								return {
									groupId: group.groupId,
									name: group.name,
									handle: group.handle,
								};
							});

							if (userGroupIds.length) {
								const groupIds = userGroupIds.join();

								// get permissions
								sql.query(
									`SELECT DISTINCT(a.name), a.* FROM velox_userpermissions as a INNER JOIN velox_userpermissions_usergroups as b WHERE a.id = b.permissionId and b.groupId IN (${groupIds}) ORDER BY a.id`,
									(err, res) => {
										if (res.length) {
											userData.permissions = res;

											result(null, userData);
											return;
										} else {
											result(null, userData);
											return;
										}
									}
								);
							} else {
								result(null, userData);
								return;
							}
						} else {
							result(null, userData);
							return;
						}
					}
				);
			} else {
				// not found User with the id
				result({ kind: 'not_found' }, null);
			}
		}
	);
};

//Encrypting text
User.encryptPassword = (password) => {
	return crypto
		.pbkdf2Sync(password, '12345', 1000, 64, `sha512`)
		.toString(`hex`);

	// let key = crypto.pbkdf2Sync(pwd, salt, iterations, keylen, `sha512`);
	// let iv = crypto.randomBytes(randomDataSize);
	// let c = crypto.createCipheriv('aes-256-cfb', key, iv);

	// let buffers = [c.update(new Buffer(password)), c.final()];
	// return Buffer.concat(buffers).toString('base64');
};

// User.decryptPassword = (encrypted) => {
// 	let key = crypto.pbkdf2Sync(pwd, salt, iterations, keylen, `sha512`);
// 	let iv = crypto.randomBytes(randomDataSize);
// 	let c = crypto.createDecipheriv('aes-256-cfb', key, iv);

// 	let decrypted = c.update(new Buffer(encrypted, 'base64'));
// 	c.final();

// 	return decrypted.toString();
// };

module.exports = User;
