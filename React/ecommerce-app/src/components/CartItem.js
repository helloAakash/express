import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { removeItem, updateItem } from './cartApi'

const CartItem = ({ product,
    cartUpdate = false,
    setRun = f => f,
    run = undefined }) => {
    const [count, setCount] = useState(product.count);


    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div className="mb-2">

                    <span className="input-group-text">Adjust Quantity</span>

                    <input type="number" value={count} onChange={handleChange(product._id)} />

                </div>
            )
        );
    };
    return (
        <>

            <div className="col-md-4 product-men mb-3">
                <div className="men-pro-item simpleCart_shelfItem">
                    <div className="men-thumb-item text-center">
                        <img src={`http://localhost:5000/${product.product_image}`} className="img-fluid" style={{ height: '250px' }} alt="" />
                        <div className="men-cart-pro">
                            <div className="inner-men-cart-pro">
                                <Link to={`/productdetails/${product._id}`} className="link-product-add-cart">Quick View</Link>
                            </div>
                        </div>
                    </div>
                    <div className="item-info-product text-center border-top mt-4">
                        <h4 className="pt-1">
                            <Link to={`/productdetails/${product._id}`}>{product.product_name}</Link>
                        </h4>
                        <div className="info-product-price my-2">
                            <span className="item_price">Rs.{product.product_price}</span>

                        </div>
                        <div className="item-info-product ">
                            {showCartUpdateOptions(cartUpdate)}
                        </div>

                        <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">


                            <button className="btn btn-danger" onClick={() => {
                                removeItem(product._id);
                                setRun(!run); // run useEffect in parent Cart
                            }} >Remove from cart </button>


                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CartItem