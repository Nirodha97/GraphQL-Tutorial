const expresss = require('express')
const { buildSchema} = require('graphql')
const { graphqlHTTP} = require('express-graphql')

const app = expresss()

const schema = buildSchema(`
 type Query {
     hello: String!
     welcomMessage(name: String, dayOfWeek: String!): String
 }
`)

const root = {
  hello:()=>{
      return "Hello world!"
  },
  welcomMessage:(args)=>{
      console.log(args);
      return `Hey ${args.name}, Hows life, Today is ${args.dayOfWeek}`
  }
}


app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema,
    rootValue:root,
}))

app.listen(4000, ()=>console.log('*Server on port 4000 '))