const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5300
const { MongoClient, ServerApiVersion } = require('mongodb')

// bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10

// middlewares
app.use(express.json())
app.use(cors())

// mongodb setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.szpk5mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
async function run () {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const usersCollection = client.db('zencashDB').collection('users')

    app.post('/user', async (req, res) => {
      const { name, email, mobile, pin } = req.body
      const pass = await bcrypt.hash(pin, saltRounds)
      const user = { name, email, mobile, pass }
      const result = await usersCollection.insertOne(user)
      res.send(result)
    })

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('ZenCash server is running.')
})

app.listen(port, () => {
  console.log(`ZenCash server is running on port: ${port}`)
})
