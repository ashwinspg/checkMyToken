const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
    name: String,
    status: { type: Boolean, default: false },
    token_number: { type: Number, default: 0 },
    _hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' }
});

mongoose.model('doctors', doctorSchema);