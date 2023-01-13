var router = require('express').Router();

const purchases = require('../controllers/purchase.controller.js');

// Create a new Request
router.post('/', purchases.create);

// // Retrieve all Requests
// router.get('/', purchases.findAll);

// // Retrieve a single Request with id
// router.get('/:id', purchases.findOne);

// // Update a Request with id
// router.put('/:id', purchases.update);

// // Delete a Request with id
// router.delete('/:id', purchases.delete);

// // Delete all Requests
// router.delete('/', purchases.deleteAll);

module.exports = router;
