const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    //let task = new Task(req.body);
    let task = new Task({
        ...req.body,
        author: req.user._id
    })

    try {
        await task.save();

        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

})

// GET /tasks?completed=true(or false)
router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()

        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e.stack);
    }

});

router.get('/tasks/:id', auth, async (req, res) => {
    let _id = req.params.id;

    try {
        const task = await Task.findOne({
            _id,
            author: req.user._id
        })
        if (!task) res.status(404).send();

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.patch('/tasks/:id', auth, async (req, res) => {
    let _id = req.params.id;

    let updates = Object.keys(req.body);
    let allowedUpdates = ['description', 'completed'];
    let isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) res.status(400).send({error: 'Invalid Update Fields! Please re-check your updates!'});

    try {
        const task = await Task.findOne({
            _id: req.params.id,
            author: req.user._id
        })
    
        if (!task) res.status(404).send();

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        
        res.send(task);
    } catch (e) {
        res.status(400).send(e.stack);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    let _id = req.params.id;

    try {
        let task = await Task.findOneAndDelete({
            _id,
            author: req.user._id
        })

        if (!task) res.status(404).send();

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;