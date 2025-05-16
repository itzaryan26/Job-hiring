const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['company', 'candidate'],
        required: true
    },
    companyDetails: {
        name: String,
        website: String,
        description: String
    },
    candidateDetails: {
        fullName: String,
        phone: String,
        resume: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});