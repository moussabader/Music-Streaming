const express = require('express')
const router = express.Router()
const PaymentController = require('../Controllers/payment.Controller')

router.post('/purchase',PaymentController.purchase)
router.post('/subscribes',PaymentController.Subscription)
router.post('/create-checkout-session',PaymentController.checkout)
router.get('/success',PaymentController.success)


module.exports = router