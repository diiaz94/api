const mongoose = require('mongoose');

let companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    identification: {
        type: {
            type: String,
            enum: [
                'J', 'V'
            ],
            default: 'V'
        },
        value: String
    },
    state: String,
    city: String,
    zone: String,
    phones: [String],
    website: String,
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    email: String,
    bussines_hours: String,
    verified: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: true
    },
    location: {
        address: String,
        latitude: String,
        longitude: String
    },
    thumbnail_image: {
        type: String,
        default: "/resources/5ce229ec23111c24781b3480.PNG"
    },
    avatar_image: {
        type: String,
        default: "/resources/5ce229ec23111c24781b3480.PNG"
    },
    categories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ],
    description: String,
    owner_name: String,
    owner_email: String


}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = companySchema
