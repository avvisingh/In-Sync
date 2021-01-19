const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    let task = new Task(req.body);

    try {
        await task.save();

        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

})

router.get('/tasks', async (req, res) => {

    try {
        let tasks = await Task.find({});

        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/tasks/:id', async (req, res) => {
    let _id = req.params.id;

    try {
        let task = await Task.findById(_id);

        if (!task) res.status(404).send();

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.patch('/tasks/:id', async (req, res) => {
    let _id = req.params.id;

    let updates = Object.keys(req.body);
    let allowedUpdates = ['description', 'completed'];
    let isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) res.status(400).send({error: 'Invalid Update Fields! Please re-check your updates!'});

    try {
        let task = await Task.findById(_id);

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
    
        if (!task) res.status(404).send();

        res.send(task);
    } catch (e) {
        res.status(400).send(e.stack);
    }
})

router.delete('/tasks/:id', async (req, res) => {
    let _id = req.params.id;

    try {
        let user = await Task.findByIdAndDelete(_id)

        if (!user) res.status(404).send();

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;