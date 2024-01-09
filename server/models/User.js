const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 18,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        min: 5,

    },
    description: {
        type: String,
        max:50,
    },
    city:{
        type:String,
        max:20
    },
    from:{
        type:String,
        max:20
    },
    relationship:{
        type:Number,
        enum:[1,2,3],
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:" ",
    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
    {timestamps:true}
);

module.exports = mongoose.model('User', UserSchema);