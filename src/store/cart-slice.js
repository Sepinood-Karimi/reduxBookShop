import {createSlice} from "@reduxjs/toolkit";

const cartInitialState = {
  items : [],
  totalQuantity : 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers : {
        addItemToCart(state,action){
            const newItem = action.payload;
            const existingItem = state.items.find(item=>item.id===newItem.id);
            state.totalQuantity ++;
            if (existingItem){
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }else{
                state.items.push({
                    id : newItem.id,
                    title : newItem.title,
                    price : newItem.price,
                    quantity : 1,
                    totalPrice : newItem.price
                })
            }
        }
    }
});

export default cartSlice;
export const cartActions = cartSlice.actions;