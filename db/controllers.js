const scoreModel =  require("./models");

module.exports = {
  get: (req,res)=> {
    res.send("Get Controllers");
    scoreModel.get();
  },
  post: (req,res)=> {
    console.log("Request: ",req.body.game);
    scoreModel.post(req.body.game, (err)=>{
      if(err){
        throw err;
      }else{
        res.send("Post Controller");
      }
    });
  }
}
