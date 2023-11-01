const mongoose = require('mongoose')

const UserScheme =new mongoose.Schema({
    username :{
        type : String, 
        required : true 
    },
    email :{
        type : String, 
        required : true,
        unique : true
    },
    uid :{
        type : String, 
        required : true,
        unique : true
    },
    password :{
        type : String, 
        required : true,
    },
    address :{
        type : Array, 
        required : false,
    },
    phone :{
        type : String, 
        required : false,
    },
    userType :{
        type : String, 
        required : true,
        enum : ['Admin' , 'Driver' , 'Cleint' , 'Vendor'],
        default : 'Client'
    },
    profile : {
        type :String , 
        required : true ,
        default : 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
} , {timestamps:true});


module.exports = mongoose.model('User' , UserScheme);


