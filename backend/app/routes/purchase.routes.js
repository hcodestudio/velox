var router = require('express').Router();

const purchases = require('../controllers/purchase.controller.js');

// Create a new Request
router.post('/new', purchases.create);

// Retrieve all Requests
router.get('/all', purchases.findAll);

// Retrieve all Requests
router.get('/all/:id', purchases.findAllById);

// // Retrieve a single Request with id
router.get('/:id', purchases.findOne);

// // Retrieve Purchase items by id
router.get('/items/:id', purchases.findAllItems);

// Update a Request with id
router.put('/edit/:id', purchases.update);

router.put('/approve/:id', purchases.approve);

// // Delete a Request with id
// router.delete('/:id', purchases.delete);

// // Delete all Requests
// router.delete('/', purchases.deleteAll);

module.exports = router;
