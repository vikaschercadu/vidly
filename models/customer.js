const Joi=require('joi');
const mongoose=require('mongoose');

const customerSchema=mongoose.Schema({
	name:{ type:String,
            required:true,
            minlength:2,
            maxlength:20},
	 isGold:{
	 	   type:Boolean,
           required:true
         },
	Phone:{
		   type:String,
           required:true
          }
});

function validateCustomer(customer)
 {
  const schema={
    name:Joi.string().min(3).required(),
    Phone:Joi.string(),
    isGold:Joi.boolean()

  };
  return Joi.validate(customer,schema);
}

const Customer=mongoose.model('customer',customerSchema);

exports.Customer=Customer;
exports.customerSchema=customerSchema;
exports.validateCustomer=validateCustomer;
