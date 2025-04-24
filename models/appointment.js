const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    patientName: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    disease: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    availableDates: { 
        type: [Date], // ✅ Changed to an array of dates
        required: true,
    },
    availableTime: {
        type: String,
        required: function() {
            return !this.customTime; // ✅ Required only if customTime is not provided
        }
    },
    customTime: {
        type: String,
        required: function() {
            return !this.availableTime; // ✅ Required only if availableTime is not provided
        }
    },
    gender: { // ✅ Fixed "Gender" to "gender"
        type: String,
        required: true, // ✅ Prevent invalid values
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        default: null,
        min: 1,
        max: 5,
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
