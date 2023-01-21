const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Joi = require('joi');
const {Genre,validateGenre}=require('../models/genre');
const auth=require('../middleware/auth');
const asyncMiddleware=require('../middleware/async');


router.get('/',asyncMiddleware(async (req,res)=>{
  
  const genre=await Genre.find();
  return res.json(genre);
}));
router.post('/',auth,asyncMiddleware(async(req, res) => {
  
    const { error } = validateGenre(req.body);  
    if(error)
    return res.status(400).send(error.details[0].message);
   
   const genre= new Genre({
	   name:req.body.name,
     rating:req.body.rating
});
 const result = await genre.save();
 res.json(result);
}));

router.put('/:name',auth, asyncMiddleware(async (req, res) => {
  
  genre = await Genre.update({name:req.params.name},{$set:{name:req.body.name}});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.json(genre);
 
}));

router.delete('/:name',auth, asyncMiddleware(async (req, res) => {
  genre=await Genre.deleteOne({name:req.params.name});
  if (!genre) return res.status(404).send('The genre of the given ID was not found.');
  res.json(genre);
  }));

router.get('/:name', asyncMiddleware(async (req, res) => {
  
  const result = await Genre.find({name:req.params.name})
  if(!result)
  	return res.status(404).send('The genre with given id is not found');
 res.json(result);
}));

module.exports=router;