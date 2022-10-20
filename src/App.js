import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import Notification from "./components/UI/Notification";
import {useEffect} from "react";
import {getCartData, sendCartData} from "./store/cart-actions";

let initial = true;

function App() {
    const showCart = useSelector(state => state.ui.cartIsVisible);
    const notification = useSelector(state => state.ui.notification);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const changed = useSelector(state=>state.cart.cartStateChanged);

    useEffect(()=>{
        dispatch(getCartData());
    },[dispatch])

    useEffect(() => {
        if (initial) {
            initial = false;
            return;
        }
        if (changed){
            dispatch(sendCartData(cart));
        }
    }, [dispatch,cart,changed]);


    return (
        <Layout>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
            {showCart && <Cart/>}
            <Products/>
        </Layout>
    );
}

export default App;
