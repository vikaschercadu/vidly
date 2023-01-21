const genres=require('../routes/genre');
const customers=require('../routes/customer');
const movies=require('../routes/movie')
const user=require('../routes/user');
const rentals=require('../routes/rental');
const auth=require('../routes/auth');
const express=require('express');
const error=require('../middleware/error');

module.exports=function(app){
	app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customer',customers);
app.use('/api/movie',movies);
app.use('/api/user',user);
app.use('/api/rental',rentals);
app.use('/api/auth',auth);
app.use(error);

}