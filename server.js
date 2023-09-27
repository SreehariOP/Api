
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./model/productModel');
const error = require('mongoose/lib/error');
const dotenv = require('dotenv');
const port = 3000;
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = process.env.PORT || 3000;

   
      
app.listen(process.env.PORT, () => console.log(`server running on PORT ${process.env.PORT}`))
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() =>console.log("Mongo DB Connected")).catch((err) => console.log("db not connected",err));


app.get('/', (req, res) => {
    res.send('NODE API')
})

app.get('/about', (req, res) => {
  res.send('Sreehari')
})



app.post('/products', async(req,res)=>{
  try {

    const product = await Product.create(req.body)
    res.status(200).json(product);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
    
  }
})

app.get('/products', async(req,res)=>{

  try {

    const products = await Product.find({});
    res.status(200).json(products);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
    
  }
})

app.get('/products/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// update a product
app.put('/products/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      // we cannot find any product in database
      if(!product){
          return res.status(404).json({message: `cannot find any product with ID ${id}`})
      }
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// app.delete('/products/:id', async(req, res) =>{
//   try {
//       const {id} = req.params;
//       const product = await Product.findByIdAndDelete(id);
//       if(!product){
//           return res.status(404).json({message: `cannot find any product with ID ${id}`})
//       }
//       res.status(200).json(product);
      
//   } catch (error) {
//       res.status(500).json({message: error.message})
//   }
// })



