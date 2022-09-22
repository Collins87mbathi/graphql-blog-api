const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  password:{
    type:String,
  },
  posts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
  ]

});

module.exports = mongoose.model('User',userSchema);