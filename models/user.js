const webtoken=require('jsonwebtoken');
const Joi=require('joi');
const config=require('config');
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
	name:{
	       type:String,
	       minlength:2,
	       maxlength:255,
	       required:true
	},
	email:{
	       type:String,
	       required:true,
	       minlength:2,
	       maxlength:255,
	       unique:true
	     },
	password:{
	          type:String,
	          required:true,
	          minlength:3,
	          maxlength:255
    
	}
});
userSchema.methods.generateAuthToken=function(){
	const token=webtoken.sign({_id:this.id},config.get('jwtPrivatekey'));
	return token;
}
const User=mongoose.model('user',userSchema);

function validate(user){
	const schema={
	         name:Joi.string().min(2).required(),
	         email:Joi.string().min(5).email().required(),
	         password:Joi.string().max(399).min(2).required()
	};
	return Joi.validate(user,schema);
}
exports.validate=validate;
exports.User=User;