const Repository = require('./repository');

class productsRepo extends Repository {}

module.exports = new productsRepo('products.json');
