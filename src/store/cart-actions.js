import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status : 'pending',
            title:'pending...',
            message : 'We are Sending Your Cart Data To Database!'
        }));
        const sendCartDataRequest = async()=>{
            const response = await fetch('https://bookshop-b63b1-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                headers : {
                    'Content-type':'/application.json'
                },
                body:JSON.stringify(cart)
            });
            if(!response.ok){
                throw new Error('Sending Cart Data Failed!')
            }
        };
        try{
            await sendCartDataRequest();
            dispatch(uiActions.showNotification({
                status : 'success',
                title : 'Success',
                message : 'We Successfully Send Your Cart Data !'
            }));
        }catch (e) {
            dispatch(uiActions.showNotification({
                status:'error',
                title : 'Error',
                message : 'We Find Trouble on Sending Your Request!'
            }));
        }
    }
};

export const getCartData = () =>{
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status:'pending',
            title : 'Pending...',
            message : 'We Are Getting Your Cart Data!'
        }));
        const sendGetDataRequest = async ()=>{
            const response = await fetch('https://bookshop-b63b1-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok){
                throw new Error('We Could Not Fetch Your Cart Data!');
            }
            const data= await response.json();
            return data;
        }
        try {
            const cartData =await sendGetDataRequest();
            dispatch(cartActions.exchangeCart({
                items:cartData.items ||[],
                totalQuantity : cartData.totalQuantity
            }))
            dispatch(uiActions.showNotification({
                status:'success',
                title:'Success!',
                message : 'We Successfully Get Your Cart Data'
            }));
        }catch (e) {
            dispatch(uiActions.showNotification({
                status:'error',
                title : 'Error!',
                message:'We Face An Error While Getting Your Cart Data'
            }));
        }
    }
}