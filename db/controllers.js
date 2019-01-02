const scoreModel =  require("./models");

module.exports = {
  get: (req,res)=> {
    res.send("Controllers");
    scoreModel.get();
  }
}
