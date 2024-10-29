const express = require('express');
const controller = require('../Controller/controller');
const router = express.Router();

router.get('/tickets/:id', controller.getTicketById);
router.get('/tickets', controller.getTickets);
router.put('/tickets/:id', controller.updateTicket);
router.post('/tickets', controller.submitTicket);


module.exports = router;