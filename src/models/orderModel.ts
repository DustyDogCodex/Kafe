import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: [ true, "Order needs username" ]
    },
    email: { 
        type: String,
        required: [ true, "Please provide a phone number" ]
    },
    address: { 
        type: String,
        required: [ true, "Please provide an address" ]
    },
    orderItems: { 
        type: Array, 
        required: [ true, "Order needs order items" ]
    },
    isPaid: { 
        type: Boolean,
        required: [ true, "Please provide payment status" ],
        default: false
    }
}, { timestamps: true })

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order