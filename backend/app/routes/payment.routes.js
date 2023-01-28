var router = require('express').Router();

const payments = require('../controllers/payment.controller.js');

// Create a new Request
router.post('/new', payments.create);

// Retrieve all Requests
router.get('/all', payments.findAll);

// Retrieve all Requests
router.get('/all/:id', payments.findAllById);

// // Retrieve a single Request with id
router.get('/:id', payments.findOne);

// // Retrieve Purchase items by id
router.get('/items/:id', payments.findAllItems);

// Update a Request with id
router.put('/edit/:id', payments.update);

router.put('/approve/:id', payments.approve);

// // Delete a Request with id
// router.delete('/:id', payments.delete);

// // Delete all Requests
// router.delete('/', payments.deleteAll);

module.exports = router;
