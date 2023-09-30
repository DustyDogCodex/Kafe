import { createSlice } from "@reduxjs/toolkit"

/* initial state for cart */
const initialState: { isCartOpen: boolean, cart: { _id: string, name: string, image: string, count: number, price: number }[], items: [] } = {
    isCartOpen: false,
    cart: [],
    items: []
}

/* CART SLICE for updating state */
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state,action) => {
            state.items = action.payload
        },
        /* reducer for adding items to cart */
        addToCart: (state,action) => {
            state.cart = [ ...state.cart, action.payload.item ]
        },
        /* reducer for removing items for cart */
        removeFromCart: (state,action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload.id)
        },
        /* reducer for increasing item count to cart */
        increaseCount: (state,action) => {
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload.item){
                    item.count++
                }
                return item
            })
        },
        /* reducer for decreasing item count to cart */
        decreaseCount: (state,action) => {
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload.item && item.count > 1){
                    item.count--
                }
                return item
            })
        },
        /* reducer for opening/closing cart*/
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen
        }
    }
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions

export default cartSlice.reducer