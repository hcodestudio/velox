const Purchase = require('../models/purchase.model.js');

// Create and Save a new Purchase
exports.create = (req, res) => {
	// Validate purchase
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	// Create a Purchase
	const purchase = new Purchase({
		subsidiaryId: req.body.subsidiaryId,
		vendorId: req.body.vendorId,
		vendor: req.body.vendor,
		costCenter: req.body.costCenter,
		purpose: req.body.purpose,
		terms: req.body.terms,
		budgetCategory: req.body.budgetCategory,
		status: req.body.status,
		requestorId: req.body.requestorId,
		receivedBy: req.body.receivedBy,
		approvedBy: req.body.approvedBy,
		dateCreated: req.body.dateCreated,
		dateUpdated: req.body.dateUpdated,
	});

	// Save Purchase in the database
	Purchase.create(purchase, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Purchase.',
			});
		else {
			// Then, save purchase request items
			const insertData = req.body.items.map((item) => [
				data.id,
				item.description,
				item.quantity,
				item.unitOfMeasure,
				item.costPerUnit,
				item.estimatedCost,
				req.body.dateCreated,
				req.body.dateUpdated,
			]);

			Purchase.insertBulk(insertData, (err, data) => {
				if (err)
					res.status(500).send({
						message:
							err.message ||
							'Some error occurred while creating the Purchase.',
					});
				else {
					res.send(data);
				}
			});
		}
	});
};

// Retrieve all Purchases from the database (with condition).
exports.findAll = (req, res) => {
	const title = req.query.title;

	Purchase.getAll(title, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving purchases.',
			});
		else res.send(data);
	});
};

// Retrieve all Purchases from the database (with condition).
exports.findAllById = (req, res) => {
	Purchase.getAllById(req.params.id, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving purchases.',
			});
		else res.send(data);
	});
};

// Find a single Purchase by Id
exports.findOne = (req, res) => {
	Purchase.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Purchase with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						'Error retrieving Purchase with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Find a single Purchase by Id
exports.findAllItems = (req, res) => {
	Purchase.getAllPurchaseItems(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Purchase with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						'Error retrieving Purchase with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Update a Purchase identified by the id in the purchase
exports.update = (req, res) => {
	// Validate Purchase
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	console.log(req.body);

	Purchase.updateById(req.params.id, new Purchase(req.body), (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Purchase with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error updating Purchase with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

exports.approve = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	Purchase.approveById(req.params.id, req.body, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Purchase with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error updating Purchase with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Delete a Purchase with the specified id in the purchase
exports.delete = (req, res) => {
	Purchase.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Purchase with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						'Could not delete Purchase with id ' + req.params.id,
				});
			}
		} else res.send({ message: `Purchase was deleted successfully!` });
	});
};

// Delete all Purchases from the database.
exports.deleteAll = (req, res) => {
	Purchase.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while removing all purchases.',
			});
		else res.send({ message: `All Purchases were deleted successfully!` });
	});
};
