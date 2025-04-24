const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    availableDates: {
        type: [Date], // Stores multiple selected dates
        required: true
    },    
    availableTime: {
        type: [String],  
        default: [],
    },
    
    department: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

// 🔒 Hash password before saving (only if changed)
doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is new/modified
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ Compare password method
doctorSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
