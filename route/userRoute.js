const express = require('express')
const { postUser,signIn,userById,read,requireSignin,signOut,postConfirmation,resendToken,forgetPassword,passwordReset } = require('../controller/user')
const router = express.Router()

router.post('/postuser', postUser)
router.post('/signin',signIn)
router.param('userId',userById)
router.get('/userinfo/:userId',requireSignin,read)
router.post('/signout',signOut)
router.post('/confirmation/:token',postConfirmation)
router.post('/resendtoken',resendToken)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword',passwordReset)

module.exports = router
