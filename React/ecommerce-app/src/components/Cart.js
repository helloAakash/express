import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar'
import { getCart } from './cartApi';
import CartItem from './CartItem';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);
    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <CartItem
                        key={i}
                        product={product}
                        cartUpdate={true}
                        setRun={setRun}
                        run={run}

                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );
    return (
        <>
            <Navbar />
            {items.length > 0 ? showItems(items) : noItemsMessage()}

        </>
    )
}

export default Cart