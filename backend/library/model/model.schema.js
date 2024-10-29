import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true // Removes excess whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address" // Email format validation
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    isVerified:{
        type:Boolean,default:false
    },email_otp:String,otp_expire_date:{type:Date},
    reset_password_token:String,
    reset_password_expiration:Date}); // Automatically creates `createdAt` and `updatedAt` fields

// Pre-save hook to hash the password before saving it
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Only hash the password if it has been modified or is new
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare hashed passwords during login
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
