const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://mondalrathin1234xx:rathin8670@cluster0.i7m3pmu.mongodb.net/")

const UserSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
})

const AccountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, // Reference to User model,
        ref:'User',
        required:true

    },
    balance:{
        type:Number,
        required:true
    }
})


// Create a model from the schema
const User=mongoose.model('User',UserSchema)
const Account=mongoose.model('Account',AccountSchema)

module.exports={
    User,Account
}