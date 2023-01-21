const mongoose=require('mongoose');
const Joi=require('joi');
const loggerSchema=mongoose.Schema({
	email:{
		type:String,
		required:true,
		minlength:5,
		maxlength:40
	},
	password:{
		type:String,
		required:true,
		minlength:5,
		maxlength:50
	}
});
const Logger=mongoose.model('logger',loggerSchema);
function validatelogger(logger)
{
	const schema={
		email:Joi.string().required().email(),
		password:Joi.string().required()
	};
	return Joi.validate(logger,schema);
}
exports.Logger=Logger;
exports.validatelogger=validatelogger;