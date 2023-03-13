const mongoose = require('mongoose');
const validator = require('validator');

// User schema
const userSchema = new mongoose.Schema({
    firstName:{type:'string',required:true},
    lastName:{type:'string',require:true},
    middleName: {type:'string'},
    dob: {type:'string'},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        unique: true,
        validate:(value)=>{
                return validator.isEmail(value)
        }
    },
    phone: {type:'string',required:true, unique:true},
    occupation: {type:'string'},
    company: {type:'string'},
    password:{type:'string',required:true},
    role:{type:'string',default:'user'},
    createdAt:{type:Date,default:Date.now()}
})

// Create a new user
userSchema.statics.createUser = async function (user) {
    return this.create(user);
};

// Get all users
userSchema.statics.getAllUsers = async function () {
    return this.find({});
};

// Get a user by ID
userSchema.statics.getUserById = async function (id) {
    return this.findById(id);
};

// Update a user by ID
userSchema.statics.updateUserById = async function (id, user) {
    return this.findByIdAndUpdate(id, user, { new: true });
};

// Delete a user by ID
userSchema.statics.deleteUserById = async function (id) {
    return this.findByIdAndDelete(id);
};


let usersModel = mongoose.model('users',userSchema);


module.exports = {mongoose, usersModel}

