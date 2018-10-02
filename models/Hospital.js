const mongoose = require('mongoose');
const { Schema } = mongoose;

const hospitalSchema = new Schema({
    name: String,
    location: String,
    contact_number: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('hospitals', hospitalSchema);