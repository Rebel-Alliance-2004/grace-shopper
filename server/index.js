const express = require('express');
const path = require('path');
const { sync } = require('./db/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const { Session, User, Cart } = require('./db/models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/client/assets', express.static(path.join(__dirname, '../client/assets')))
app.use(express.static(path.join(__dirname, '../dist')))

app.use(cookieParser());

app.use(async (req, res, next) => {

    try {
        if (!req.cookies.session_id) {

            const session = await Session.create();
            const newCart = {
                sessionId: session.id
            }
            const cart = await Cart.create(newCart);


            const oneYear = 1000 * 60 * 60 * 24 * 7 * 52;

            res.cookie('session_id', session.id, {
                path: '/',
                expires: new Date(Date.now() + oneYear)
            });

            res.cookie('cart_id', cart.id, {
                path: '/',
                expires: new Date(Date.now() + oneYear)
            });

            req.session_id = session.id;
            req.cart_id = cart.id;

            next();

        } else {

            req.session_id = req.cookies.session_id;
            req.cart_id = req.cookies.cart_id;

            const user = await User.findOne({
                include: [
                    {
                        model: Session,
                        where: {
                            id: req.session_id
                        }
                    },
                    {
                        model: Cart,
                        where: {
                            id: req.cart_id
                        }
                    }
                ]
            });

            if (user) {
                req.user = user;
            }

            next();
        }
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

});

app.use('/api', router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: err.message });
});

// sync the db then start the server
sync(false)
    .then(() => {
        app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
    })
