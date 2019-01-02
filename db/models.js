const database = require("./config");

module.exports = {
  get: ()=> {
    console.log("Get Models Fired")
  },
  post: (data,callback) =>{
    console.log("Post Models Fired")
    let query = `INSERT INTO games (player, frame_one, frame_two, frame_three, frame_four, frame_five, frame_six, frame_seven, frame_eight,frame_nine, frame_ten, score) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
    database.query(query, data, (err)=>{
      if(err) throw err;
      callback(err)
    })
  }
}