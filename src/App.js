import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import Notification from "./components/UI/Notification";
import {useEffect} from "react";
import {sendCartData} from "./store/cart-actions";

let initial = true;

function App() {
    const showCart = useSelector(state => state.ui.cartIsVisible);
    const notification = useSelector(state => state.ui.notification);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (initial) {
            initial = false;
            return;
        }
        dispatch(sendCartData(cart));
    }, [dispatch,cart]);


    return (
        <Layout>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
            {showCart && <Cart/>}
            <Products/>
        </Layout>
    );
}

export default App;
