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
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e); 
    }
})

router.get('/users',  auth, async (req, res) => { //To assign middleware to a specific route handler, you pass it as an argument to that route before you define the callback function for that route.
    
    try {
        let users = await User.find({});

        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        let user = await User.findById(_id);

        if (!user) res.status(404).send();

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.patch('/users/:id', async (req, res) => {
    let _id = req.params.id;

    const updates = Object.keys(req.body); //keys() returns an array with each of the object's properties as an item in the array
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'});
    }

    try {
        const user = await User.findById(_id); //The reason we replaced .findByIdAndUpdate() with .findById and then manual update is because .findByIdAndUpdate() bypasses our middleware.

        updates.forEach((update) => user[update] = req.body[update])
        await user.save();

        if (!user) res.status(404).send();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }

})

router.delete('/users/:id', async (req, res) => {
    let _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id)

        if(!user) res.status(404).send();

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;