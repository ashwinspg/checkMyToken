const mongoose = require('mongoose');
const { Schema } = mongoose;

const hospitalSchema = new Schema({
    name: String,
    location: String,
    contact_number: String,
    _doctors: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'doctors' 
    }]
});

mongoose.model('hospitals', hospitalSchema);