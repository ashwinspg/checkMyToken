const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
    name: String,
    status: { type: Boolean, default: false },
    token_number: { type: String, default: '-' },
    _hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' }
});

mongoose.model('doctors', doctorSchema);