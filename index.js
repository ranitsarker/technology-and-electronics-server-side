const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      const productCollection = client.db('productDB').collection('product');
      const userCollection = client.db('productDB').collection('user');
      const cartCollection = client.db('productDB').collection('cart');


      // product post endpoint 
      app.post('/product', async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
      })
      // user post endpoint 
      app.post('/user', async(req, res) => {
        const newUser = req.body;
        console.log(newUser);
        const result = await userCollection.insertOne(newUser);
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
        const cursor = productCollection.find({ brand: 'Samsung' });
        const samsungProducts = await cursor.toArray();
        res.send(samsungProducts);
      });
      // product get endpoint for Sony products
      app.get('/product/sony', async (req, res) => {
        const cursor = productCollection.find({ brand: 'Sony' });
        const sonyProducts = await cursor.toArray();
        res.send(sonyProducts);
      });
      // product get endpoint for Google products
      app.get('/product/google', async (req, res) => {
          const cursor = productCollection.find({ brand: 'Google' }); 
          const googleProducts = await cursor.toArray();
          res.send(googleProducts);
      });

      // product get endpoint for Intel products
      app.get('/product/intel', async (req, res) => {
        const cursor = productCollection.find({ brand: 'Intel' });
        const intelProducts = await cursor.toArray();
        res.send(intelProducts);
      });
      // product get endpoint for Microsoft products
      app.get('/product/microsoft', async (req, res) => {
        const cursor = productCollection.find({ brand: 'Microsoft' });
        const microsoftProducts = await cursor.toArray();
        res.send(microsoftProducts);
      });
      // product update get endpoint 
      app.get('/product/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);
        res.send(result);
      });

      // product update put endpoint 
      app.put('/product/:id', async (req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const options = { upset: true };
        const updatedProduct = req.body;
        const product = {
          $set: {
            image:updatedProduct.image,
            name:updatedProduct.name,
            brand:updatedProduct.brand,
            type:updatedProduct.type,
            price:updatedProduct.price,
            rating:updatedProduct.rating,
          }
        }
        const result = await productCollection.updateOne(filter, product, options);
        res.send(result);
      })

// post endpoint for add to cart
app.post('/add-to-cart', async (req, res) => {
  try {
    const { email, product } = req.body;
    console.log('User email:', email);
    console.log('Product to add:', product); 

    // Insert the product into the user's cart collection
    const result = await cartCollection.insertOne({ email, product });
    console.log('Insert result:', result); // Log the database insert result

    if (result.insertedId) {
      console.log('Product added to cart successfully');
      res.status(201).send({ message: 'Product added to cart successfully' });
    } else {
      console.error('Failed to add product to cart. Database error:', result);
      res.status(500).send({ message: 'Failed to add product to cart' });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).send({ message: 'Failed to add product to cart' });
  }
});

// Get user's cart by email
app.get('/cart/:email', async (req, res) => {
  try {
    const userEmail = req.params.email; // Get the user's email from the URL
    const userCartData = await cartCollection.find({ email: userEmail }).toArray();
    res.json(userCartData);
  } catch (error) {
    console.error('Error fetching user cart data:', error);
    res.status(500).json({ message: 'Failed to fetch user cart data' });
  }
});

// Delete a product from the user's cart
app.delete('/remove-from-cart', async (req, res) => {
  try {
    const { email, product } = req.body;
    console.log('User email:', email);
    console.log('Product to remove:', product);

    // Delete the product from the user's cart collection
    const result = await cartCollection.deleteOne({ email, 'product._id': product._id });
    console.log('Delete result:', result);

    if (result.deletedCount > 0) {
      console.log('Product removed from cart successfully');
      res.status(200).send({ message: 'Product removed from cart successfully' });
    } else {
      console.error('Failed to remove product from cart. Product not found in the cart.');
      res.status(404).send({ message: 'Product not found in the cart' });
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).send({ message: 'Failed to remove product from cart' });
  }
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
