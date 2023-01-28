const sql = require('./db.js');
const crypto = require('crypto');

// constructor
const Payment = function (payment) {
	this.purpose = payment.purpose;
	this.payee = payment.payee;
	this.paymentMethod = payment.paymentMethod;
	this.requestedBy = payment.requestedBy;
	this.dateRequired = payment.dateRequired;
	this.totalAmount = payment.totalAmount;
	this.dateCreated = payment.dateCreated;
	this.dateUpdated = payment.dateUpdated;
	this.status = payment.status;
};

Payment.create = (data, result) => {
	sql.query('INSERT INTO velox_payment_requests SET ?', data, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...data, password: null });
	});
};

Payment.insertBulk = (data, result) => {
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

Payment.findById = (id, result) => {
	sql.query(
		`SELECT * FROM velox_payment_requests WHERE id = ${id}`,
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log('found payment: ', res[0]);
				let payment = {
					...res[0],
					approvals: [],
				};

				// get approval data;
				sql.query(
					`SELECT a.*, CONCAT(b.firstName, b.lastName) AS approvedBy, d.handle as groupHandle, d.name as groupName FROM velox_payment_requests_approvals AS a INNER JOIN velox_users AS b INNER JOIN velox_usergroups_users AS c INNER JOIN velox_usergroups AS d WHERE a.approvedByUserId = b.id AND a.approvedByUserId = c.userId AND c.groupId = d.id AND a.paymentRequestId = ${id}`,
					(err, res) => {
						if (err) {
							console.log('error: ', err);

							result(err, null);
							return;
						}

						if (res.length) {
							payment.approvals = res;
							// get approval data;

							result(null, payment);
							return;
						} else {
							result(null, payment);
						}
					}
				);
			} else {
				// not found Payment with the id
				result({ kind: 'not_found' }, null);
			}
		}
	);
};

Payment.getAll = (title, result) => {
	let query = 'SELECT a.* FROM velox_payment_requests a';

	// query += ` WHERE a.requestorId = b.id`;

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

Payment.getById = (id, result) => {
	let query = 'SELECT * FROM velox_payment_requests';

	query += ` WHERE id = ${id}`;

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

Payment.getAllPurchaseItems = (id, result) => {
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

Payment.updateById = (id, payment, result) => {
	sql.query(
		'UPDATE velox_payment_requests SET purpose = ?, payee = ?, requestedBy = ?, totalAmount = ?, paymentMethod = ?, dateRequired = ? WHERE id = ?',
		[
			payment.purpose,
			payment.payee,
			payment.requestedBy,
			payment.totalAmount,
			payment.paymentMethod,
			payment.dateRequired,
			id,
		],
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found Payment with the id
				result({ kind: 'not_found' }, null);
				return;
			}

			console.log('updated payment: ', { id: id, ...payment });
			result(null, { id: id, ...payment });
		}
	);
};

Payment.approveById = (id, payment, result) => {
	let data = [payment.status, payment.dateUpdated];

	let query = 'UPDATE velox_payment_requests SET status = ?, dateUpdated = ?';

	if (payment.approverRole == 'finalApproval') {
		query += `, rfpNumber = ?`;
		data.push(`RFP-${payment.id}`);
	}

	if (payment.approverRole == 'manager') {
		query += `, dateApproved = ?`;
		data.push(payment.dateUpdated);
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
			// not found Payment with the id
			result({ kind: 'not_found' }, null);
			return;
		} else {
			// update approvals table

			sql.query(
				`INSERT INTO velox_payment_requests_approvals (paymentRequestId, approvedByUserId, dateCreated, dateUpdated) VALUES(${Number(
					payment.id
				)}, ${payment.approver}, "${payment.dateCreated}", "${
					payment.dateCreated
				}")`,
				(err, res) => {
					if (err) {
						console.log('error: ', err);
						result(null, err);
						return;
					}

					if (res.affectedRows == 0) {
						// not found Payment with the id
						result({ kind: 'not_found' }, null);
						return;
					} else {
						// update approvals table

						console.log('updated payment: ', {
							id: id,
							...payment,
						});
						result(null, { id: id, ...payment });
					}
				}
			);
		}
	});
};

Payment.remove = (id, result) => {
	sql.query('DELETE FROM tutorials WHERE id = ?', id, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Payment with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('deleted payment with id: ', id);
		result(null, res);
	});
};

Payment.removeAll = (result) => {
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

module.exports = Payment;
