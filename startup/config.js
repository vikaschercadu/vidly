	const config=require('config');

module.exports=function(){

if(!config.get('jwtPrivatekey'))
{
    	throw new Error('FATAL ERROR,jwt key not defined');
	process.exit(1);
	
}
}