import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    done: {                     // Indicates whether the expense is paid or not
        type: Boolean,
        default: false             //initial value is false
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: "User", // Reference to the User model
        required: true 
    }

}, {timestamps: true}); // Automatically add createdAt and updatedAt timestamps

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense; 