const mongoose = require('mongoose');

const SecureSchema = new mongoose.Schema({
    policyNumber: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    coverageAmount: {
        type: Number,
        required: true,
    },
    deductibleAmount: {
        type: Number,
        required: true,
    },
    insuredCar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    policyHolder: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    additionalNotes: {
        type: String,
    },
});

const Secure = mongoose.model('Secure', SecureSchema);

module.exports = Secure;
