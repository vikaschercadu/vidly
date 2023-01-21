const bcrypt=require('bcrypt');
const _=require('lodash');
const express=require('express');
const router=express.Router();
const {Logger,validatelogger}=require('../models/auth');

const {User,validate}=require('../models/user')
router.post('/',async(req,res)=>{
	  
      const {error}=validatelogger(req.body);
      if(error)
      	return res.status(400).send(error.details[0].message);

	try{
		const user=await User.findOne({email:req.body.email});
	if(!user)
		return res.status(400).send('Invalid email or password');
	}
	catch(ex)
	{
		return res.status(500).send('wrong')
	}
	
	const valid=await bcrypt.compare(req.body.password,user.password);
	if(!valid)
		return res.status(400).send('Invalid email or password');
   

   
   const token=user.generateAuthToken();
   if(token)
    res.header('x-auth-token',token).send(_.pick(user,['_id','email']));

});
router.get('/me',async(req,res)=>
{
	const user=User.find({name:req.user.name});
	res.json(user);
})
module.exports = router;