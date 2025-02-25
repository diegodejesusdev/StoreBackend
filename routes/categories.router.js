const express = require('express');

const router = express.Router();

router.get('/:id/products', (req, res) => {
  res.json({
    category_id: req.params.id,
    products: [
      {
        id: 1,
        name: 'Product 1'
      },
      {
        id: 2,
        name: 'Product 2'
      }
    ]
  })
})

module.exports = router;
