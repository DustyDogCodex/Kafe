import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    name: { 
        type: String , 
        required: [true, "Please provide an item name"]
    },
    price: { 
        type: Number,
        required: [true, "Please provide an item price"]
    },
    description: { 
        type: String,
        required: [true, "Please provide an item description"]
    },
    image: { 
        type: String,
        required: [true, "Please provide an item image"]
    },
    category: { 
        type: Array, 
        default: [] 
    }
})

const Item = mongoose.models.items || mongoose.model('Item', itemSchema)

export default Item