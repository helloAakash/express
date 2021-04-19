const express = require('express')
const { postProduct, productList, ProductById, read, deleteProduct } = require('../controller/product')
const router = express.Router()

router.post('/postproduct', postProduct)
router.get('/productlist', productList)
router.param('productId', ProductById)
router.get('/singleproduct/:productId', read)
router.delete('/deleteproduct/:productId', deleteProduct)
route.put('/updateproduct/:productId',updateProduct)

module.exports = router
