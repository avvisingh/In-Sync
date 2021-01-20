const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => { //The middleware function has access to the same information as our route handler function does - req and res. The 'next' argument, however, is specific to registering middleware.
//     console.log(req.method, req.path);
//     if (req.method === 'GET') {
//         res.status(400).send('GET requests are currently disabled')
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('This website is currently under maintenance. Please try again later.');
// })

app.use(express.json()); //Setting This line means express will automatically parse incoming JSON to an object so we can access it in our request handlers.   
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');
const main = async () => {
    // const task = await Task.findById('60082c311a13ed571c73cdd3');
    // await task.populate('author').execPopulate(); 
    // console.log(task.author);

    const user = await User.findById('60082a9e4d9d654d9cb6de72');
    await user.populate('tasks').execPopulate()
    console.log(user.tasks);
}

main();