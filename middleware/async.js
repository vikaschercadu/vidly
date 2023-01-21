module.exports=function(header)
{ return async (req,res,next)=>
  {
   try{
   await header(req,res);
   }
   catch(ex)
   {
     next(ex);
   }
 };
}