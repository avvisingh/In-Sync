const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//SendGrid API Key = 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  

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Setting This line means express will automatically parse incoming JSON to an object so we can access it in our request handlers.   
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');
