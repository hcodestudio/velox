const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	// Create a User
	const user = new User({
		username: req.body.username,
		password: User.hashPassword(req.body.password),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		jobTitle: req.body.jobTitle,
		email: req.body.email,
		address: req.body.address,
		admin: req.body.admin,
		dateCreated: req.body.dateCreated,
		dateUpdated: req.body.dateUpdated,
	});

	// Save User in the database
	User.create(user, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the User.',
			});
		else res.send(data);
	});
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
	const title = req.query.title;

	User.getAll(title, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving users.',
			});
		else res.send(data);
	});
};

// Find a single User by Id
exports.findOne = (req, res) => {
	User.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found User with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error retrieving User with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// find all published Users
exports.findAllPublished = (req, res) => {
	User.getAllPublished((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving users.',
			});
		else res.send(data);
	});
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	console.log(req.body);

	User.updateById(req.params.id, new User(req.body), (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found User with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error updating User with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
	User.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found User with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Could not delete User with id ' + req.params.id,
				});
			}
		} else res.send({ message: `User was deleted successfully!` });
	});
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
	User.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while removing all users.',
			});
		else res.send({ message: `All Users were deleted successfully!` });
	});
};

// Find a single User by credentials
exports.auth = (req, res) => {
	const email = req.body.email;
	const password = User.hashPassword(req.body.password);

	User.authenticate({ email, password }, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.send(null);
			} else {
				res.status(500).send({
					message: 'Error retrieving User.',
				});
			}
		} else {
			res.send(data);
		}
	});
};
