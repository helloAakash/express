const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
//for athentication use jwt
const expressJwt = require('express-jwt')
//for authorization use express-jwt

const Token = require('../model/token')
const sendEmail = require('../utils/verifyEmail')
const crypto = require('crypto')

exports.postUser = (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  user.save((error, users) => {
    if (error || !users) {
      return res.status(400).json({
        error: "Unable to create an account"
      })
    }

    const token = new Token({
      token: crypto.randomBytes(16).toString('hex'),
      userId: users._id
    })

    token.save((error) => {
      if (error) {
        return res.status(400).json({
          error: error
        })
      }
      sendEmail({
        from: 'no-reply@yourwebapplication.com',
        to: users.email,
        subject: 'Email verification Link',
        text: `Hello, \n\n please Verify your account by clicking the below link: \n http:\/\/${req.headers.host}\/api\/confirmation\/${token.token} `
      })
    })


    res.json({
      users
    })
  })
}

//confirm email after signup
exports.postConfirmation = (req, res) => {
  //at first find the matching token
  Token.findOne({
    token: req.params.token
  }, (error, token) => {
    if (error || !token) {
      return res.status(400).json({
        error: "invalid tokeno, token may have expired"
      })
    }
    //if we found the valid token then find the valid user
    User.findOne({
      _id: token.userId
    }, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "we are unable to find the valid user for this token"
        })
      }

      //check if the user is already verified or not
      if (user.isVerified) {
        return res.status(400).json({
          error: "the email has already been verified please login to continue"
        })
      }

      //save the verified user
      user.isVerified=true
      user.save((error)=>{
        if(error){
          return res.status(400).json({error:error})
        }

        res.json({message:"Congrats, your account has been verified. Please login to continue"})

      })
    })
  })
}

//resend verification tokeno
exports.resendToken=(req,res)=>{
  //at first find the register userRoute
  User.findOne({email:req.body.email},(error,user)=>{
    if(!user || error){
      return res.status(400).json({error:"The email you provided was not found in our system"})
    }
    if(user.isVerified){
      return res.status(400).json({error:"The given email is already verified"})
    }
    //now create a token save token to database and send verification Link
    const token = new Token({
      userId:user._id,
      token:crypto.randomBytes(16).toString('hex')
    })
    token.save((error,result)=>{
      if(error || !result){
        return res.status(400).json({error:error})
      }

      //send mail
      sendEmail({
        from: 'no-reply@yourwebapplication.com',
        to: user.email,
        subject: 'Email verification Link',
        text: `Hello, \n\n please Verify your account by clicking the below link: \n http:\/\/${req.headers.host}\/api\/confirmation\/${token.token} `
      })
    })
    res.json({message:"verification link has been sent to your email address"})
  })
}


exports.signIn = (req, res) => {
  const {
    email,
    password
  } = req.body
  //at first check email if it exists in database or // NOTE:
  User.findOne({
    email
  }, (error, user) => {
    if (!user || error) {
      return res.status(400).json({
        error: "sorry the provided email doesnot exists"
      })
    }
    //no the correct password feor the given email

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "email and password doesnot match"
      })
    }
    if (!user.isVerified) {
      return res.status(400).json({
        error: "you need to verify your account before login"
      })
    }

    //now generate token with id and jwt server
    const token = jwt.sign({
      _id: user._id
    }, process.env.JWT_SECRET)
    //presist the token with expiry date using the cookie
    res.cookie('t', token, {
      expire: Date.now() + 999999
    })

    //return response with user and token to frontend

    const {
      _id,
      name,
      email,
      role
    } = user
    return res.json({
      token,
      user: {
        name,
        email,
        _id,
        role
      }
    })
  })
}


//for authorization
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

//to get user by id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    req.user = user
    next()
  })
}

//to show single user details

exports.read = (req, res) => {
  res.json(req.user)
}


//signout

exports.signOut = (req, res) => {
  res.clearCookir('t')
  res.json({
    message: "signout success"
  })
}

//forget _password
exports.forgetPassword=(req,res)=>{
  User.findOne({email:req.body.email},(error,user)=>{
    if(error || !user){
      return res.status(400).json({error:"sorry the email you provided doesnot exists"})
    }

    const token = new Token({
      userId:user._id,
      token:crypto.randomBytes(16).toString('hex')
    })
    token.save((error)=>{
      if(error){
        return res.status(400).json({error:"something went wrong"})
      }

      //send mail
      sendEmail({
        from: 'no-reply@yourwebapplication.com',
        to: user.email,
        subject: 'password reset Link',
        text: `Hello, \n\n please reset your password by clicking the below link: \n http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token} `
      })

    })
    res.json({message:"password reset link been sent your email"})
  })
}

//password reset
exports.passwordReset=(req,res)=>{
  //at first find the valid token
  Token.findOne({token:req.params.token},(error,token)=>{
    if(error || !token){
      return res.status(400).json({error:"invalid token or toke may have expired"})
    }

    //if token found find the valid user
    User.findOne({
      _id :token.userId,
      email:req.body.email
    },(error,user)=>{
      if(error || !user){
        return res.status(400).json({error:"sorry the email you provided not associated with this token"})
      }

      //upadate new password
      user.password=req.body.password
      user.save((error)=>{
        if(error){
          return res.json({error:"failed to reset password"})
        }
      })
      res.json({message:"password has been reset succesfully"})
    })
  })
}

//access only for authenticate user
exports.isAuth=(req,res,next)=>{
  let user = req.user && req.auth && req.user._id ===req.auth._id
  if(!user){
    return res.status(400).json({error:"access denied"})
  }
  next()
}



//check if admin or not
exports.isAdmin = (req,res,next)=>{
  if(req.user.role===0){
    return res.status(400).json({error:"access denied, this is a admin resource"})
  }
  next()
}
