const expresss = require('express')
const { buildSchema} = require('graphql')
const { graphqlHTTP} = require('express-graphql')

const app = expresss()

const schema = buildSchema(`

type User {
    name: String
    age: Int
    college: String
},

 type Query {
     hello: String!
     welcomMessage(name: String, dayOfWeek: String!): String
     getUser: User
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
}


app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema,
    rootValue:root,
}))

app.listen(4000, ()=>console.log('*Server on port 4000 '))