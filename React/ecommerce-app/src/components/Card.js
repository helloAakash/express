import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { addItem } from './cartApi'

const Card = ({ product }) => {
    const[redirect,setRedirect]=useState(false)

    const addToCart=()=>{
        addItem(product,setRedirect(true))
    }

    const shouldRedirect=redirect=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    return (
        <>

            <div className="col-md-4 product-men mb-3">
                <div className="men-pro-item simpleCart_shelfItem">
                    <div className="men-thumb-item text-center">
                        {shouldRedirect()}
                        <img src={`http://localhost:5000/${product.product_image}`} className="img-fluid" style={{height:'250px'}} alt=""/>
                            <div className="men-cart-pro">
                                <div className="inner-men-cart-pro">
                                    <Link to={`/productdetails/${product._id}`} className="link-product-add-cart">Quick View</Link>
                                </div>
                            </div>
                    </div>
                </div>
                        <div className="item-info-product text-center border-top mt-4">
                            <h4 className="pt-1">
                                <Link to={`/productdetails/${product._id}`}>{product.product_name}</Link>
                            </h4>
                            <div className="info-product-price my-2">
                                <span className="item_price">{product.product_price}</span>
                                
                            </div>
                            <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                <button className="btn btn-info" onClick={addToCart}>Add to Cart</button>
                            </div>
                        </div>
                </div>


        </>
    )
}

export default Card
