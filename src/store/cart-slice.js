import {createSlice} from "@reduxjs/toolkit";

const cartInitialState = {
    items: [],
    totalQuantity: 0,
    cartStateChanged : false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        exchangeCart(state,action){
          state.items = action.payload.items;
          state.totalQuantity = action.payload.totalQuantity;
        },
        addItemToCart(state, action) {
            state.cartStateChanged = true;
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            } else {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
        },
        removeItemFromCart(state, action) {
            state.cartStateChanged = true;
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity --;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

export default cartSlice;
export const cartActions = cartSlice.actions;