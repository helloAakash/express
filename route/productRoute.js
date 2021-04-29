const express = require('express')
const { postProduct, productList, ProductById, read, deleteProduct,updateProduct } = require('../controller/product')
const upload = require('../middleware/file-upload');
const {productValidation}=require('../validation');
const router = express.Router()

router.post('/postproduct',upload.single('product_image'), productValidation, postProduct)
router.get('/productlist', productList)
router.param('productId', ProductById)
router.get('/singleproduct/:productId', read)
router.delete('/deleteproduct/:productId', deleteProduct)
router.put('/updateproduct/:productId',updateProduct)

module.exports = router
