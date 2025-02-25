const express = require('express');
const ProductService = require('../services/products.service');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.findAll();
  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await service.findById(id);
    res.json(product);
  }catch(error){
    next(error);
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  const newProduct = await service.create(data);
  res.status(201).json(newProduct);
})

router.patch('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  }catch(error){
    next(error);
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await service.delete(id));
})

module.exports = router;
