const sql = require('./db.js');
const crypto = require('crypto');

// constructor
const Purchase = function (purchase) {
	this.subsidiaryId = purchase.subsidiaryId;
	this.vendorId = purchase.vendorId;
	this.purpose = purchase.purpose;
	this.terms = purchase.terms;
	this.budgetCategory = purchase.budgetCategory;
	this.status = purchase.status;
	this.requestorId = purchase.requestorId;
	this.receivedBy = purchase.receivedBy;
	this.approvedBy = purchase.approvedBy;
	this.dateCreated = purchase.dateCreated;
	this.dateUpdated = purchase.dateUpdated;
};

Purchase.create = (data, result) => {
	sql.query('INSERT INTO velox_purchase_requests SET ?', data, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...data, password: null });
	});
};

Purchase.insertBulk = (data, result) => {
	sql.query(
		'INSERT INTO velox_purchase_request_items (purchaseId, description, quantity, unitOfMeasure, costPerUnit, estimatedCost, dateCreated, dateUpdated) VALUES ?',
		[data],
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(err, null);
				return;
			}

			result(null, { id: res.insertId, ...data, password: null });
		}
	);
};

Purchase.getAll = (title, result) => {
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

Purchase.findById = (id, result) => {
	sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log('found purchase: ', res[0]);
			result(null, res[0]);
			return;
		}

		// not found Purchase with the id
		result({ kind: 'not_found' }, null);
	});
};

Purchase.getAllPublished = (result) => {
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

Purchase.updateById = (id, purchase, result) => {
	sql.query(
		'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?',
		[purchase.title, purchase.description, purchase.published, id],
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found Purchase with the id
				result({ kind: 'not_found' }, null);
				return;
			}

			console.log('updated purchase: ', { id: id, ...purchase });
			result(null, { id: id, ...purchase });
		}
	);
};

Purchase.remove = (id, result) => {
	sql.query('DELETE FROM tutorials WHERE id = ?', id, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Purchase with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('deleted purchase with id: ', id);
		result(null, res);
	});
};

Purchase.removeAll = (result) => {
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

Purchase.authenticate = ({ email, password }, result) => {
	sql.query(
		`SELECT id, firstName, lastName, admin, email, jobTitle, username, address FROM velox_users WHERE password="${password}" AND (email = "${email}" OR username = "${email}")`,
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log('found purchase: ', res[0]);
				result(null, res[0]);
				return;
			}

			// not found Purchase with the id
			result({ kind: 'not_found' }, null);
		}
	);
};

//Encrypting text
Purchase.hashPassword = (password) => {
	return crypto
		.pbkdf2Sync(password, '12345', 1000, 64, `sha512`)
		.toString(`hex`);
};

module.exports = Purchase;
