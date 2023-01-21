const winston=require('winston');
module.exports=(err,req,res,next)=>
{
   winston.log('error', err,err.message);
   return res.status(500).send('Something went wrong');
	};
