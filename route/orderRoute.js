



const express = require('express')
const {postOrderItem}=require('../controller/order')
const router = express.Router()

router.post('/postorderitem',postOrderItem)


module.exports = router
