const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 },
    _hospital: { 
        type: Schema.Types.ObjectId, 
        ref: 'hospitals' 
    }
});

mongoose.model('users', userSchema);