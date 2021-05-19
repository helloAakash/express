import React, { useState, useEffect, Fragment } from 'react'
import Navbar from '../layouts/Navbar'
import Card from './Card'
import { productDetails, listRelated } from './uiApi'

const ProductDetail = (props) => {

    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([])

    const loadSingleProduct = productId => {
        productDetails(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)

                //after fetching single product feetch related which match same category
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }
    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <>
            <Navbar />
            <div className="banner-bootom-w3-agileits py-5">


                <div className="row">
                    <div className="col-lg-5 col-md-8 single-right-left ">
                        <div className="grid images_3_of_2">
                            <img src={`http://localhost:5000/${product.product_image}`} className="img-fluid" alt="" />
                        </div>
                    </div>

                    <div className="col-lg-7 single-right-left simpleCart_shelfItem">
                        <h3 className="mb-3">{product.product_name}</h3>
                        <p className="mb-3">
                            <span className="item_price">Rs.{product.product_price}</span>
                            <del className="mx-2 font-weight-light">$280.00</del>
                            <label>Free delivery</label>
                        </p>
                        <div className="single-infoagile">
                            <ul>
                                <li className="mb-3">
                                    Cash on Delivery Eligible.
							</li>
                                <li className="mb-3">
                                    Shipping Speed to Delivery.
							</li>
                                <li className="mb-3">
                                    Bank OfferExtra 5% off* with Nabil Bank Buzz Credit CardT&C
							</li>
                            </ul>
                        </div>
                        <div className="product-single-w3l">
                            <p className="my-3">
                                <i className="far fa-hand-point-right mr-2"></i>
                                <label>Product</label>Description</p>
                            <p>{product.product_description}</p>
                            <p className="my-sm-4 my-3">
                                <i className="fas fa-retweet mr-3"></i>Net banking & Credit/ Debit/ ATM card
						</p>
                        </div>
                        <div className="occasion-cart">
                            <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                <button className="btn btn-info">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {relatedProduct.length > 0 && (
                <Fragment>
                    <div className="ads-grid py-sm-5 py-4">
                        <div className="container py-xl-4 py-lg-2">

                            <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
                                <span>R</span>elated<span>P</span>roducts</h3>

                            <div className="row">

                                <div className="agileinfo-ads-display col-lg-12">
                                    <div clasName="wrapper">

                                        <div className="product-sec1 px-sm-4 px-3 py-sm-5  py-3 mb-4">
                                            <div className="row">
                                                {relatedProduct.map((product, i) => (
                                                    <Card key={i} product={product} />
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}




        </>
    )
}

export default ProductDetail
