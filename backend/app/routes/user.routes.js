var router = require('express').Router();

const users = require('../controllers/user.controller.js');

/// POST

// Login
router.post('/auth', users.auth);

// Create a new User
router.post('/', users.create);

/// GET

router.get('/all-users', users.getAllUsers);
router.get('/all-usergroups', users.getAllUserGroups);

// Retrieve a single User with id
router.get('/:id', users.findUserById);

/// PUT

// Update a User with id
router.put('/:id', users.update);

/// DELETE

// Delete a User with id
router.delete('/:id', users.delete);

// Delete all Users
router.delete('/', users.deleteAll);

module.exports = router;
