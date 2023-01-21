const mongoose=require('mongoose');
const Joi=require('joi');

const genreSchema = mongoose.Schema({
	name:{ 
		   type:String,
		   required:true
		},
	rating:{
		     type:Number,
		     required:true
	       }	    
   });

function validateGenre(genre) {
  
  const schema = {
    name: Joi.string().min(3),
    rating:Joi.number().required()
  };

  return Joi.validate(genre, schema);
}; 
  const Genre=mongoose.model('genre',genreSchema);
  exports.Genre=Genre;
  exports.validateGenre=validateGenre;
