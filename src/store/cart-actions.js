import {uiActions} from "./ui-slice";

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