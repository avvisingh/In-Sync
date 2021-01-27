const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;



const multer = require('multer');
//After requiring Multer, we will actuallt go ahead and set it up below -- creating instances of the app
//Might actually end up configuring multer multiple times for a single application
//Based on our app needs - do we want to accept just images, or just PDF, or both.. etc.
const upload = multer({
    dest: 'images', //'dest' short for destination
    limits: {
        fileSize: 1000000  
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('File type must be a word document'));
        }

        cb(undefined, true); 

        // cb(new Error('File must be a PDF')); //This setup is used if there is an error which has ocurred
        // cb(undefined, true); //This is used if no error (first argument) and file is accepted
        // cb(undefined, false); //This used if we want to silently reject the upload. (Not good)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    try {
        res.send()
    } catch (e) {
        res.send('Oops, something went wrong! ' + e)
    }
})



app.use(express.json()); //Setting This line means express will automatically parse incoming JSON to an object so we can access it in our request handlers.   
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');
