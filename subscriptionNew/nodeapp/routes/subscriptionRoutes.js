const mongoose = require('mongoose');
const express = require('express');
const { getAllSubscription, getSubscriptionById, addSubscription, updateSubscription, removeSubscription } = require('../controllers/subscriptionController');

const router = express.Router();

router.get('/getAllSubscriptions', getAllSubscription)
router.get('/getSubscriptionById/:id', getSubscriptionById)
router.post('/addSubscription', addSubscription)
router.put('/updateSubscription/:id', updateSubscription)
router.delete('/removeSubscription/:id', removeSubscription);

module.exports = router;