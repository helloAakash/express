const express = require('express')
const { postUser,signIn,userById,read,requireSignin,signOut,postConfirmation,resendToken } = require('../controller/user')
const router = express.Router()

router.post('/postuser', postUser)
router.post('/signin',signIn)
router.param('userId',userById)
router.get('/userinfo/:userId',requireSignin,read)
router.post('/signout',signOut)
router.post('/confirmation/:token',postConfirmation)
router.post('/resendtoken',resendToken)

module.exports = router
