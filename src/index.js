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

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismyrandomstring', { expiresIn: '7 days' }) //The return value from sign is your jwt token
    console.log(token);

    const data = jwt.verify(token, 'thisismyrandomstring');
    console.log(data);
}

myFunction();