const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const {customerSchema,validateCustomer}=require('../models/customer');
const auth=require('../middleware/auth');
const Customer=mongoose.model('customer',customerSchema);
const asyncMiddleware=require('../middleware/async');
router.get('/',async (req,res)=>{
  const customer =await Customer.find();
  res.json(customer);
});

router.post('/', auth,asyncMiddleware(async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    Phone: req.body.Phone
  });
  customer = await customer.save();
  
  res.send(customer);
}));
router.get('/:name',async (req,res)=>
 { 
    customer=await Customer.find({name:req.params.name})
    if(customer.length===0)
      res.send('Error in name');
    res.json(customer);
 });
router.delete('/:name',auth,asyncMiddleware(async (req,res)=>
 {
   const validity=validateCustomer(req.params.name);
   if(!validity)
    res.status(404).send('Error');
   const result=await Customer.deleteOne({name:req.params.name});
   res.json(result);

 }));
router.put('/:name',auth,asyncMiddleware(async(req,res)=>
 {
   
   customer=await Customer.update({name:req.params.name},
                                      {$set:{
                                         name:req.body.name,
                                          isGold: req.body.isGold,
                                           Phone:req.body.Phone
                                         }
                                       });
 res.json(customer);
}));
 
 module.exports=router;
