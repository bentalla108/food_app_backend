const mongoose = require('mongoose')

const RestaurantScheme = new mongoose.Schema({

    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,

    },

    imageUrl: {
        type: String,
        required: true,
        default: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600'
    },

    foods: {
        type: Array

    },
    pickup: {
        type: Boolean,
        required: false,
        default: true

    },
    delivery: {
        type: Boolean,
        required: false,
        default: true

    },
    isAvailable: {
        type: Boolean,
        default: true

    },
    code: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
        default: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String,
    },
    coords: {
        id: {
            type: String,
            required: true
        }
        ,
        latitude: {
            type: Number, required: true
        },
        longitude: {
            type: Number, required: true
        },
        latitudeDelta: {
            type: Number, required: true
        },
        longitudeDelta: {
            type: Number, required: true
        },
        phone: {
            type: String,
            required: false,
        },

        title: {
            type: String,
            required: true,
        },

        address: {
            type: Array,
            required: true,
        }
    }
}, { timestamps: true });


module.exports = mongoose.model('Restaurant', RestaurantScheme);
