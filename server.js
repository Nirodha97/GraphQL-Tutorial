const expresss = require('express')
const { buildSchema} = require('graphql')
const { graphqlHTTP} = require('express-graphql')
const axios = require('axios')
const app = expresss()

let message = "This is a message";

const schema = buildSchema(`

type Post {
    userId: Int
    id:Int
    title: String
    body: String
}

type User {
    name: String
    age: Int
    college: String
},

 type Query {
     hello: String!
     welcomMessage(name: String, dayOfWeek: String!): String
     getUser: User
     getUsers: [User]
     getPostFromExternalAPI:[Post]
     message: String
 }

type Mutation {
  setMessage(newMessage: String): String
}

`)




const root = {
  hello:()=>{
      return "Hello world!"
  },
  welcomMessage:(args)=>{
      console.log(args);
      return `Hey ${args.name}, Hows life, Today is ${args.dayOfWeek}`
  },

  getUser: ()=>{
    const user = {
        name: 'Nirodha',
        age:25,
        college:'Harishchandra',
    };
    return user
  },

  getUsers:()=>{
    const users = [
        {
            name: 'Nirodha',
            age:25,
            college:'Harishchandra',
        },
        {
            name: 'Nimashi',
            age:25,
            college:'Kandy',
        },    
    ];

    return users
  },

  getPostFromExternalAPI: async ()=>{
      const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return result.data
  // return axios.get('https://jsonplaceholder.typicode.com/posts').then(result => result.data);
  },

  setMessage:({newMessage})=>{
      message= newMessage
      return message
  },

  message:()=> message,
}


app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema,
    rootValue:root,
}))

app.listen(4000, ()=>console.log('*Server on port 4000 '))