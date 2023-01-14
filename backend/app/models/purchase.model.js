const sql = require('./db.js');
const crypto = require('crypto');

// constructor
const Purchase = function (purchase) {
	this.subsidiaryId = purchase.subsidiaryId;
	this.vendorId = purchase.vendorId;
	this.vendor = purchase.vendor;
	this.costCenter = purchase.costCenter;
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

Purchase.findById = (id, result) => {
	sql.query(
		`SELECT requests.*, users.firstName, users.lastName FROM velox_purchase_requests as requests INNER JOIN velox_users as users WHERE requests.id = ${id} AND requests.requestorId = users.id`,
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

Purchase.getAll = (title, result) => {
	let query =
		'SELECT a.*, b.firstName, b.lastName FROM velox_purchase_requests a, velox_users b';

	query += ` WHERE a.requestorId = b.id`;

	if (title) {
		query += ` WHERE title LIKE '%${title}%'`;
	}

	query += ` ORDER BY a.id DESC`;

	sql.query(query, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('purchases: ', res);
		result(null, res);
	});
};

Purchase.getAllById = (id, result) => {
	let query =
		'SELECT a.*, b.firstName, b.lastName FROM velox_purchase_requests a, velox_users b';

	query += ` WHERE a.requestorId = b.id AND a.requestorId = ${id}`;
	query += ` ORDER BY a.id DESC`;

	sql.query(query, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('purchases: ', res);
		result(null, res);
	});
};

Purchase.getAllPurchaseItems = (id, result) => {
	sql.query(
		` SELECT * FROM velox_purchase_request_items as items WHERE items.purchaseId = ${id}`,
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(null, err);
				return;
			}

			console.log('tutorials: ', res);
			result(null, res);
		}
	);
};

Purchase.updateById = (id, purchase, result) => {
	sql.query(
		'UPDATE velox_purchase_requests SET terms = ?, purpose = ? WHERE id = ?',
		[purchase.terms, purchase.purpose, id],
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

Purchase.approveById = (id, purchase, result) => {
	sql.query(
		'UPDATE velox_purchase_requests SET status = ?, dateUpdated = ? WHERE id = ?',
		[purchase.status, purchase.dateUpdated, id],
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

module.exports = Purchase;
