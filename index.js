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
      const productCollection = client.db('productDB').collection('product')

      // product post endpoint 
      app.post('/product', async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
      })
      // product get endpoint 
      app.get('/product', async(req, res) => {
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })
      // product get endpoint for Apple products
      app.get('/product/apple', async (req, res) => {
        const cursor = productCollection.find({ brand: 'Apple' });
        const appleProducts = await cursor.toArray();
        res.send(appleProducts);
      });
      // product get endpoint for Samsung products
      app.get('/product/samsung', async (req, res) => {
        const cursor = productCollection.find({ brand: 'samsung' });
        const samsungProducts = await cursor.toArray();
        res.send(samsungProducts);
      });
      // product get endpoint for Sony products
      app.get('/product/sony', async (req, res) => {
        const cursor = productCollection.find({ brand: 'sony' });
        const sonyProducts = await cursor.toArray();
        res.send(sonyProducts);
      });
      // product get endpoint for Google products
      app.get('/product/google', async (req, res) => {
        const cursor = productCollection.find({ brand: 'google' });
        const googleProducts = await cursor.toArray();
        res.send(googleProducts);
      });
      // product get endpoint for Intel products
      app.get('/product/intel', async (req, res) => {
        const cursor = productCollection.find({ brand: 'intel' });
        const intelProducts = await cursor.toArray();
        res.send(intelProducts);
      });
      // product get endpoint for Microsoft products
      app.get('/product/microsoft', async (req, res) => {
        const cursor = productCollection.find({ brand: 'microsoft' });
        const microsoftProducts = await cursor.toArray();
        res.send(microsoftProducts);
      });
      




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
  