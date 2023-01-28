const Payment = require('../models/payment.model.js');

// Create and Save a new Payment
exports.create = (req, res) => {
	// Validate payment
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	// Create a Payment
	const payment = new Payment({
		purpose: req.body.purpose,
		payee: req.body.payee,
		paymentMethod: req.body.paymentMethod,
		dateRequired: req.body.dateRequired,
		totalAmount: req.body.totalAmount,
		dateCreated: req.body.dateCreated,
		dateUpdated: req.body.dateUpdated,
		status: 'pending',
	});

	// Save Payment in the database
	Payment.create(payment, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Payment.',
			});
		else {
			res.send(data);
		}
	});
};

// Retrieve all Purchases from the database (with condition).
exports.findAll = (req, res) => {
	const title = req.query.title;

	Payment.getAll(title, (err, data) => {
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
	Payment.getById(req.params.id, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving purchases.',
			});
		else res.send(data);
	});
};

// Find a single Payment by Id
exports.findOne = (req, res) => {
	Payment.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Payment with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						'Error retrieving Payment with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Find a single Payment by Id
exports.findAllItems = (req, res) => {
	Payment.getAllPurchaseItems(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Payment with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						'Error retrieving Payment with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Update a Payment identified by the id in the payment
exports.update = (req, res) => {
	// Validate Payment
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	console.log(req.body);

	Payment.updateById(req.params.id, new Payment(req.body), (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Payment with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error updating Payment with id ' + req.params.id,
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

	Payment.approveById(req.params.id, req.body, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Payment with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error updating Payment with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Delete a Payment with the specified id in the payment
exports.delete = (req, res) => {
	Payment.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Payment with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						'Could not delete Payment with id ' + req.params.id,
				});
			}
		} else res.send({ message: `Payment was deleted successfully!` });
	});
};

// Delete all Purchases from the database.
exports.deleteAll = (req, res) => {
	Payment.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while removing all purchases.',
			});
		else res.send({ message: `All Purchases were deleted successfully!` });
	});
};
