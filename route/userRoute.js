const express = require('express')
const { postUser,signIn,userById,read,requireSignin,signOut } = require('../controller/user')
const router = express.Router()

router.post('/postuser', postUser)
router.post('/signin',signIn)
router.param('userId',userById)
router.get('/userinfo/:userId',requireSignin,read)
router.post('/signout',signOut)
module.exports = router
