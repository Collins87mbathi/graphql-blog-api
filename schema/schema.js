const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const bcrypt = require("bcryptjs");

const User = require('../models/User');
const Post = require('../models/Post');




const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID},
        username: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
        posts : {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
             return Post.find({ UserId: parent.id});
            }
        }
    })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {type: GraphQLID },
    title: {type: GraphQLString},
    desc: { type: GraphQLString},
    photo: {type: GraphQLString},
    user: {
        type: UserType,
        resolve(parent, args) {
            return User.findById(parent.UserId);
        }
        
    }
  })
});


const RootQuery = new GraphQLObjectType({
name: "RootQueryType",
fields : {
 post: {
    type: PostType,
    args: {id : {type: GraphQLID} },

    resolve(parent, args) {
     return Post.findById(args.id);
    }
},

user : {
type: UserType,
args: {id: {type: GraphQLID}},

resolve(parent, args) {
    return Post.findById(args.id);
}
},

posts : {
    type: new GraphQLList(PostType),
    resolve(parent, args) {
        return Post.find({});
    } 
},

users : {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find({});
    }
} 

}
});

const mutation = new GraphQLObjectType({
 name: "Mutation",
 fields: {
 register : {
    type: UserType,
    args: {
        username: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
    },
    resolve(parent, args) {
    const  salt = bcrypt.genSalt(10);
    const hashpassword = bcrypt.hash(args.password,salt);
      const user = new User({
      username: args.username,
      email: args.email,
      password: hashpassword,
      });
      return user.save();
    }
 },

 login : {
    type: UserType,
    args: {
        email: { type: GraphQLString},
        password: { type: GraphQLString }
    },
    resolve(parents, args) {
        const user = User.findOne({ email:args.email});
        const isMatch = bcrypt.compare(args.password,user.password);
        if (!isMatch) return console.log("wrong password");
        return user;
    }
    
 },

 addPost: {
    type: 'PostType',
    args: {
        title: {type: GraphQLString},
        desc: {type: GraphQLString},
        photo: {type: GraphQLString},
    },
    resolve(parents,args) {
        let post = new Post({
            title: args.title,
            desc: args.desc,
            photo: args.photo

        })

        return post;
    }
  }

 }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
  });