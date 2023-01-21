const Joi=require('joi');
const mongoose=require('mongoose');
const genreSchema=require('./genre');
const movieSchema=mongoose.Schema({
	title:{
		   type:String,
		   required:true,
		   trim:true,
		   minlength:3,
		   maxlength:40
		},
	genre:{  
		    type:genreSchema,
		    required:true
		   },
	Itemcount:{
		     type:Number,
		     required:true
		 },
	Costperday:{
		        type:Number,
		        required:true
		     }
});
const Movie=mongoose.model('movie',movieSchema);
function validatemovie(movie){
	const schema={
		title:Joi.string().min(3).max(40).required(),
		Itemcount:Joi.number().required(),
		Costperday:Joi.number().required(),
		genre:Joi.object().required()
		
	};
	return Joi.validate(movie,schema);
}
exports.Movie=Movie;
exports.validatemovie=validatemovie;