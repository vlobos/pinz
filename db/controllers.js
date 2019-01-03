const scoreModel =  require("./models");

module.exports = {
  get: (req,res)=> {
    scoreModel.get((err,results)=>{
      if(err) {
        throw errl
      }else{
        res.send(results);
      }
    });
  },
  post: (req,res)=> {
    scoreModel.post(req.body.game, (err)=>{
      if(err){
        throw err;
      }else{
        res.send("Post Controller");
      }
    });
  }
}
