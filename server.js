const expresss = require('express')
const { buildSchema} = require('graphql')
const { graphqlHTTP} = require('express-graphql')

const app = expresss()

const schema = buildSchema(`
 type Query {
     hello: String
   
 }
`)

const root = {
  hello:()=>{
      return "Hello world!"
  }
}


app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema,
    rootValue:root,
}))

app.listen(4000, ()=>console.log('*Server on port 4000 '))