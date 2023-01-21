const Joi=require('joi');
const config=require('config');
const mongoose=require('mongoose');
const {validate,User}=require('../models/user');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const _=require('lodash');
const webtoken=require('jsonwebtoken');
const asyncMiddleware=require('../middleware/async');
const auth=require('../middleware/auth')
router.post('/',asyncMiddleware(async(req,res)=>
{
   
   	const {error}=validate(req.body);
     if(error)
     return res.status(404).send(error.details[0].message);
   
   	
   let user = await User.findOne({ email: req.body.email });
  if (user)  
  	return res.status(400).send('User already registered.');
   
   
   	
   
   user = new User(_.pick(req.body, ['name', 'email', 'password']));
   
   const salt=await bcrypt.genSalt(10);
   user.password=await bcrypt.hash(req.body.password,salt);
   const token =user.generateAuthToken();
   res.header('x-auth-key',token).json(_.pick(user,['name','email']));
   await user.save();
}));

module.exports=router;