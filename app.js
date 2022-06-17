const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ['grthwr5tht4q_erg_rtwgrG_erwg_EgrwoigjipujhspñihjnuOJfgioytfOUvOUv'],
  })
);

app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log('Listening');
});