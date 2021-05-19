import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar'
import Card from './Card'
import { getProducts } from './uiApi'

const Home = () => {
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error)
      }
      else {
        setProductsByArrival(data)
      }
    })
  }
  useEffect(() => {
    loadProductsByArrival()
  }, [])

  return (
    <>
      <Navbar />

      <div className="ads-grid py-sm-5 py-4">
        <div className="container py-xl-4 py-lg-2">

          <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
            <span>N</span>ew

				<span>A</span>rrival</h3>

          <div className="row">

            <div className="agileinfo-ads-display col-lg-12">
              <div clasName="wrapper">

                <div className="product-sec1 px-sm-4 px-3 py-sm-5  py-3 mb-4">
                  <div className="row">
                    {productsByArrival.map((product,i)=>(
                      <Card key={i} product={product}/>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
