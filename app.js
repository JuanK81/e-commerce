const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require ('cookie-session');
const usersRepo = require('./repositories/users');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['grthwr5tht4q_erg_rtwgrG_erwg_EgrwoigjipujhspñihjnuOJfgioytfOUvOUv']
}))

app.get('/', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordconfirmation" placeholder="password confirmation" />
            <button>Sign upt</button>
        </form>
    </div>
    `)
});

app.post('/', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email already exists. Please try again.')
    }

    if ( password !== passwordConfirmation) {
        console.log(password, passwordConfirmation);
        return res.send('Password confirmation does not match. Please try again.');
    }

    //create user in user repo to represent this person
    const user = await usersRepo.create({ email: email, password: password });
    console.log(user)
    //store ID of the user iside users cookie
    req.session.userId = user.id; //added by cookie session

    res.send('account created')
})

app.listen(3000, () => {
    console.log('Listening');
});

