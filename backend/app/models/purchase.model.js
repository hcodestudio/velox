const {
	queryPurchaseApprovals,
	queryPurchaseItem,
	queryInsertApproval,
} = require('./queries/purchase.js');

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
	sql.query(queryPurchaseItem(id), (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log('found purchase: ', res[0]);
			let purchase = {
				...res[0],
				approvals: [],
			};

			// get approval data;
			sql.query(queryPurchaseApprovals(id), (err, res) => {
				if (err) {
					console.log('error: ', err);

					result(err, null);
					return;
				}

				if (res.length) {
					purchase.approvals = res;
					// get approval data;

					result(null, purchase);
					return;
				} else {
					result(null, purchase);
				}
			});
		} else {
			// not found Purchase with the id
			result({ kind: 'not_found' }, null);
		}
	});
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
		'SELECT a.*, b.firstName, b.lastName, CONCAT(c.firstName, c.lastName) as requestor FROM velox_purchase_requests a, velox_users b INNER JOIN velox_users c';

	query += ` WHERE a.requestorId = c.id AND`;
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
	let data = [purchase.status, purchase.dateUpdated];

	let query =
		'UPDATE velox_purchase_requests SET status = ?, dateUpdated = ?';

	if (purchase.approverRole == 'finalApproval') {
		query += `, purchaseNumber = ?`;
		data.push(`PO-${purchase.id}`);
	}

	if (purchase.approverRole == 'manager') {
		query += `, dateApproved = ?`;
		data.push(purchase.dateUpdated);
		data[0] = 'approved';
	}

	query += ` WHERE id = ?`;
	data.push(id);

	sql.query(query, data, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Purchase with the id
			result({ kind: 'not_found' }, null);
			return;
		} else {
			// update approvals table

			sql.query(
				`INSERT INTO velox_purchase_requests_approvals (purchaseRequestId, approvedByUserId, dateCreated, dateUpdated) VALUES(${Number(
					purchase.id
				)}, ${purchase.approver}, "${purchase.dateCreated}", "${
					purchase.dateCreated
				}")`,
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
					} else {
						// update approvals table

						console.log('updated purchase: ', {
							id: id,
							...purchase,
						});
						result(null, { id: id, ...purchase });
					}
				}
			);
		}
	});
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
