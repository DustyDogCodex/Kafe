import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    category: { type: Array, default: [] }
})

const Item = mongoose.models.items || mongoose.model('Item', itemSchema)

export default Item