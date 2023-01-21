const express=require('express');
const route=express.Router();
const Joi=require('joi');
const mongoose=require('mongoose');
const {Genre,genreSchema}=require('../models/genre');
const {Movie,validatemovie}=require('../models/movie');
const auth=require('../middleware/auth');
const asyncMiddleware=require('../middleware/async');
const _=require('lodash');

 route.get('/',asyncMiddleware(async(req,res)=>
{
	
	const movie=await Movie.find();
	res.json(movie);
}));
route.get('/:title',asyncMiddleware(async(req,res)=>{
	const movie=await Movie.find({title:req.params.title});
	if(!movie)
		res.status(400).send('Error');
	res.json(movie);
}));
route.delete('/:title',auth,asyncMiddleware(async(req,res)=>
{
	const movie=await Movie.deleteOne({name:req.params.title});
	res.json(movie);

}));
route.post('/',auth,asyncMiddleware(async(req,res)=>
{
	const {error}=validatemovie(req.body);
	if(error)
		return res.status(400).send(error.details[0].message);

	const genre=new Genre({
		 name:req.body.genre.name,
	   });
	const movie=new Movie({
	            title:req.body.title,
	            genre:{
	            	_id:genre._id,
	            	name:genre.name
	            },
	            Itemcount:req.body.Itemcount,
	            Costperday:req.body.Costperday
	            
	});
	const movies=await movie.save();
    res.json(_.pick(movie,['title','Itemcount','Costperday','genre']));
}));
route.put('/:title',auth,asyncMiddleware(async (req,res)=>
{
   const movie=await Movie.update({title:req.params.title},
   	        {
   	        	$set:{
   	        	    title:req.body.title,
            //genre:req.body.genre.name,
             Itemno:req.body.Itemno
              }
         });
 //Rating:req.body.Rating
   if(!movie)
   	res.status(404).send('Error');
   res.json(movie);

 }));
module.exports=route;
