const mongoose = require('mongoose');

const CONNNECTDB = (url) => {
   mongoose.connect(url).then(()=> {
      console.log("database connected");
  }).catch((err)=>{
 console.log(err);
  })
}

module.exports = CONNNECTDB;