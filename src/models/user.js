const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //Setting required to true means that whenever I create an instance of User, the name field will be required.
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7, //We could alos have made a custom validator funtion to check for length
        trim: true,
        validate(value) {
            if (validator.contains(value.toLowerCase(), 'password')) { //We've added toLowerCase() because without it, 'DickensteinPassword' with a capital P would've been accepted.
                throw new Error('Password cannot contain the phrase "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0, //We can provide a default value here since this field is not required. 
        validate(value) { //The validate method recieves (as its first argument) the value to be validated
            if (value < 0) {
                throw new Error('Age must be a positive number!');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true  
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, 'thisissecret');

    user.tokens = user.tokens.concat({ token })
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('Your email and/or password is incorrect. Please try again.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Your email and/or password is incorrect. Please try again.');   
    }

    return user;
}

//Hash the plain-text password before saving
userSchema.pre('save', async function (next) { //This NEEDS to be an standard function, not an arrow function because the this binding plays an important role.
    //When we use the 'this' keyword here, it gives us access to the individual user that is about to be saved
    const user = this;

    if (user.isModified('password')) { //.isModified() here will return true if the user is just being created or if the user has been updated and their password was changed
        user.password = await bcrypt.hash(user.password, 8);
    }

    next(); //We call next to indicate that this function's process is over
})

//The .model() method accepts two arguments:
//- The first is the STRING name for your model
//- The second is the definition where we define all the fields we want. 
const User = mongoose.model('User', userSchema);

module.exports = User;