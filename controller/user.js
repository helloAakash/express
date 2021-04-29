const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
//for athentication use jwt
const expressJwt = require('express-jwt')
//for authorization use express-jwt

const Token=require('../model/token')
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
            return res.status(400).json({ error: "Unable to create an account" })
        }

        const token =new Token({
          token:crypto.randomBytes(16).toString('hex'),
          userId:users._id
        })

        token.save((error)=>{
          if(error){
            return res.status(400).json({error:error})
          }
          sendEmail({
            from:'no-reply@yourwebapplication.com',
            to:users.email,
            subject:'Email verification Link',
            text:`Hello, \n\n please Verify your account by clicking the below link: \n http:\/\/req.headers.host\/api\/confirmation\/token.token `
          })
        })


        res.json({ users })
    })
}


exports.signIn=(req,res)=>{
  const{email,password}=req.body
  //at first check email if it exists in database or // NOTE:
  User.findOne({email},(error,user)=>{
    if(!user|| error){
      return res.status(400).json({error:"sorry the provided email doesnot exists"})
      }
    //no the correct password feor the given email

    if(!user.authenticate(passowrd)){
      return res.status(400).json({error:"email and password doesnot match"})
    }
    if(!user.isVerified){
      return res.status(400).json({error:"you need to verify your account before login"})
    }

    //now generate token with id and jwt server
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
    //presist the token with expiry date using the cookie
    res.cookie('t',token,{expire:Date.now()+999999})

    //return response with user and token to frontend

    const{_id,name,email,role}=user
    return res.json({token,user:{name,email,_id,role}})
  })
}


//for authorization
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms:["HS256"],
  userProperty:"auth",
})

//to get user by id
exports.userById = (req,res,next,id)=>{
  User.findById(id).exec((error,user)=>{
    if(error || !user){
      return res.status(400).json({error:"User not found"})
    }
    req.user = user
    next()
  })
}

//to show single user details

exports.read = (req, res)=>{
  res.json(req.user)
}


//signout

exports.signOut = (req,res)=>{
  res.clearCookir('t')
  res.json({message:"signout success"})
}
