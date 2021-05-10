import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../components/auth'

const Navbar = ({ history }) => {
	return (
		<>
			<div class="agile-main-top">
				<div class="container-fluid">
					<div class="row main-top-w3l py-2">
						<div class="col-lg-4 header-most-top">
							<p class="text-white text-lg-left text-center">Offer Zone Top Deals & Discounts
					</p>
						</div>
						<div class="col-lg-8 header-right mt-lg-0 mt-2">

							<ul>

								<li class="text-center border-right text-white">
									<i class="fas fa-phone mr-2"></i> 9814141412
						</li>
								{!isAuthenticated() && (
									<Fragment>

										<li class="text-center border-right text-white">
											<Link to="/signin" class="text-white">
												<i class="fas fa-sign-in-alt mr-2"></i> Log In </Link>
										</li>
										<li class="text-center text-white">
											<Link to="/signup" class="text-white">
												<i class="fas fa-sign-out-alt mr-2"></i>Register </Link>
										</li>

									</Fragment>
								)}

								{isAuthenticated() && isAuthenticated().user.role===0 &&(
									<li class="text-center text-white">
										<Link to="/user/dashboard" class="text-white">My Profile </Link>
									</li>

								)}

								{isAuthenticated() && isAuthenticated().user.role===1 &&(
									<li class="text-center text-white">
										<Link to="/admin.dashboard" class="text-white">Admin DashBoard </Link>
									</li>
								)}

								{isAuthenticated()&&(
									<button className="btn btn-danger" style={{cursor:'pointer'}} onClick={()=>signout(()=>{
										history.push('/')
									})}>Signout</button>
								)}





							</ul>

						</div>
					</div>
				</div>
			</div>




			<div class="header-bot">
				<div class="container">
					<div class="row header-bot_inner_wthreeinfo_header_mid">

						<div class="col-md-3 logo_agile">
							<h1 class="text-center">
								<Link to="index.html" class="font-weight-bold font-italic">
									<img src="images/logo2.png" alt=" " class="img-fluid" />Electro Store
						</Link>
							</h1>
						</div>

						<div class="col-md-9 header mt-4 mb-md-0 mb-4">
							<div class="row">

								<div class="col-10 agileits_search">
									<form class="form-inline" action="#" method="post">
										<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" required />
										<button class="btn my-2 my-sm-0" type="submit">Search</button>
									</form>
								</div>

								<div class="col-2 top_nav_right text-center mt-sm-0 mt-2">
									<div class="wthreecartaits wthreecartaits2 cart cart box_1">
										<form action="#" method="post" class="last">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="display" value="1" />
											<button class="btn w3view-cart" type="submit" name="submit" value="">
												<i class="fas fa-cart-arrow-down"></i>
											</button>
										</form>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="navbar-inner">
				<div class="container">
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="agileits-navi_search">
							<form action="#" method="post">
								<select id="agileinfo-nav_search" name="agileinfo_search" class="border" required="">
									<option value="">All Categories</option>
									<option value="Televisions">Televisions</option>
									<option value="Headphones">Headphones</option>
									<option value="Computers">Computers</option>
									<option value="Appliances">Appliances</option>
									<option value="Mobiles">Mobiles</option>
									<option value="Fruits &amp; Vegetables">Tv &amp; Video</option>
									<option value="iPad & Tablets">iPad & Tablets</option>
									<option value="Cameras & Camcorders">Cameras & Camcorders</option>
									<option value="Home Audio & Theater">Home Audio & Theater</option>
								</select>
							</form>
						</div>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav ml-auto text-center mr-xl-5">
								<li class="nav-item active mr-lg-2 mb-lg-0 mb-2">
									<Link class="nav-Link" to="index.html">Home
								<span class="sr-only">(current)</span>
									</Link>
								</li>
								<li class="nav-item dropdown mr-lg-2 mb-lg-0 mb-2">
									<Link class="nav-Link dropdown-toggle" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Electronics
							</Link>
									<div class="dropdown-menu">
										<div class="agile_inner_drop_nav_info p-4">
											<h5 class="mb-3">Mobiles, Computers</h5>
											<div class="row">
												<div class="col-sm-6 multi-gd-img">
													<ul class="multi-column-dropdown">
														<li>
															<Link to="product.html">All Mobile Phones</Link>
														</li>
														<li>
															<Link to="product.html">All Mobile Accessories</Link>
														</li>
														<li>
															<Link to="product.html">Cases & Covers</Link>
														</li>
														<li>
															<Link to="product.html">Screen Protectors</Link>
														</li>
														<li>
															<Link to="product.html">Power Banks</Link>
														</li>
														<li>
															<Link to="product.html">All Certified Refurbished</Link>
														</li>
														<li>
															<Link to="product.html">Tablets</Link>
														</li>
														<li>
															<Link to="product.html">Wearable Devices</Link>
														</li>
														<li>
															<Link to="product.html">Smart Home</Link>
														</li>
													</ul>
												</div>
												<div class="col-sm-6 multi-gd-img">
													<ul class="multi-column-dropdown">
														<li>
															<Link to="product.html">Laptops</Link>
														</li>
														<li>
															<Link to="product.html">Drives & Storage</Link>
														</li>
														<li>
															<Link to="product.html">Printers & Ink</Link>
														</li>
														<li>
															<Link to="product.html">Networking Devices</Link>
														</li>
														<li>
															<Link to="product.html">Computer Accessories</Link>
														</li>
														<li>
															<Link to="product.html">Game Zone</Link>
														</li>
														<li>
															<Link to="product.html">Software</Link>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</li>
								<li class="nav-item dropdown mr-lg-2 mb-lg-0 mb-2">
									<Link class="nav-Link dropdown-toggle" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Appliances
							</Link>
									<div class="dropdown-menu">
										<div class="agile_inner_drop_nav_info p-4">
											<h5 class="mb-3">TV, Appliances, Electronics</h5>
											<div class="row">
												<div class="col-sm-6 multi-gd-img">
													<ul class="multi-column-dropdown">
														<li>
															<Link to="product2.html">Televisions</Link>
														</li>
														<li>
															<Link to="product2.html">Home Entertainment Systems</Link>
														</li>
														<li>
															<Link to="product2.html">Headphones</Link>
														</li>
														<li>
															<Link to="product2.html">Speakers</Link>
														</li>
														<li>
															<Link to="product2.html">MP3, Media Players & Accessories</Link>
														</li>
														<li>
															<Link to="product2.html">Audio & Video Accessories</Link>
														</li>
														<li>
															<Link to="product2.html">Cameras</Link>
														</li>
														<li>
															<Link to="product2.html">DSLR Cameras</Link>
														</li>
														<li>
															<Link to="product2.html">Camera Accessories</Link>
														</li>
													</ul>
												</div>
												<div class="col-sm-6 multi-gd-img">
													<ul class="multi-column-dropdown">
														<li>
															<Link to="product2.html">Musical Instruments</Link>
														</li>
														<li>
															<Link to="product2.html">Gaming Consoles</Link>
														</li>
														<li>
															<Link to="product2.html">All Electronics</Link>
														</li>
														<li>
															<Link to="product2.html">Air Conditioners</Link>
														</li>
														<li>
															<Link to="product2.html">Refrigerators</Link>
														</li>
														<li>
															<Link to="product2.html">Washing Machines</Link>
														</li>
														<li>
															<Link to="product2.html">Kitchen & Home Appliances</Link>
														</li>
														<li>
															<Link to="product2.html">Heating & Cooling Appliances</Link>
														</li>
														<li>
															<Link to="product2.html">All Appliances</Link>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</li>
								<li class="nav-item mr-lg-2 mb-lg-0 mb-2">
									<Link class="nav-Link" to="about.html">About Us</Link>
								</li>
								<li class="nav-item mr-lg-2 mb-lg-0 mb-2">
									<Link class="nav-Link" to="product.html">New Arrivals</Link>
								</li>
								<li class="nav-item dropdown mr-lg-2 mb-lg-0 mb-2">
									<Link class="nav-Link dropdown-toggle" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Pages
							</Link>
									<div class="dropdown-menu">
										<Link class="dropdown-item" to="product.html">Product 1</Link>
										<Link class="dropdown-item" to="product2.html">Product 2</Link>
										<div class="dropdown-divider"></div>
										<Link class="dropdown-item" to="single.html">Single Product 1</Link>
										<Link class="dropdown-item" to="single2.html">Single Product 2</Link>
										<div class="dropdown-divider"></div>
										<Link class="dropdown-item" to="checkout.html">Checkout Page</Link>
										<Link class="dropdown-item" to="payment.html">Payment Page</Link>
									</div>
								</li>
								<li class="nav-item">
									<Link class="nav-Link" to="contact.html">Contact Us</Link>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}

export default withRouter(Navbar)
