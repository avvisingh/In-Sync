const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router()

router.post('/users', async (req, res) => {

    let user = new User(req.body);

    try {
        await user.save();
        let token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        res.send()
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => { //To assign middleware to a specific route handler, you pass it as an argument to that route before you define the callback function for that route.
    res.send(req.user);
});


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body); //keys() returns an array with each of the object's properties as an item in the array
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' });
    }

    try { 
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }

})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;