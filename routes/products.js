const express = require('express');
const productsRepo = require('../repositories/products');
const productsIbdexTemplate = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
 res.send(productsIbdexTemplate({ products }));
});

module.exports = router;