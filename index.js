const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

// mongodb configuration code: 
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wgcoqid.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      await client.connect();
      // product post endpoint 
      app.post('/product', async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
      })




      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);
  // mongodb configuration code end 

app.get('/', (req, res) => {
    res.send('Server has connected successfully!!!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  