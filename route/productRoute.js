const express = require('express')
const { postProduct, productList, ProductById, read, deleteProduct,updateProduct, listRelated, listBySearch } = require('../controller/product')
const {userById,requireSignin,isAdmin} = require('../controller/user')
const upload = require('../middleware/file-upload');
const {productValidation}=require('../validation');
const router = express.Router()

router.post('/postproduct/:userId',requireSignin,isAdmin,upload.single('product_image'), productValidation, postProduct)
router.get('/productlist', productList)
router.param('productId', ProductById)
router.get('/singleproduct/:productId', read)
router.delete('/deleteproduct/:productId', deleteProduct)
router.put('/updateproduct/:productId',updateProduct)
router.get('/products/related/:productId',listRelated)
router.post('/products/by/search',listBySearch)

router.param('userId',userById)

module.exports = router
