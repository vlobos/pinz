const database = require("./config");

module.exports = {
  get: (callback)=> {
    console.log("Get Models Fired");
    let query = `SELECT id, player, score FROM games ORDER BY score desc`;
    database.query(query,(err,results)=>{
      if(err) throw err;
      callback(err,results);
    })
  },
  post: (data,callback) =>{
    let totalScore = Number(data[11]);
    let query = `INSERT INTO games (player, frame_one, frame_two, frame_three, frame_four, frame_five, frame_six, frame_seven, frame_eight,frame_nine, frame_ten, score) VALUES (?,?,?,?,?,?,?,?,?,?,?,${totalScore})`
    database.query(query, data, (err)=>{
      if(err) throw err;
      callback(err)
    })
  }
}