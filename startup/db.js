const mongoose=require('mongoose');
module.exports=function(){
	
db=mongoose.connect("mongodb://localhost:27017/vidly", { useNewUrlParser: true });
 if(db)
 	console.log("connected to MongoDB");
 }