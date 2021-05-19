import React from 'react'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/auth/Signup'
import Confirm from './components/auth/Confirm'
import Signin from './components/auth/Signin'
import Forgetpassword from './components/auth/Forgetpassword'
import Resetpassword from './components/auth/Resetpassword'
import PrivateRoute from './components/auth/PrivateRouter'
import UserDashboard from './components/auth/UserDashboard'
import AdminRoute from './components/auth/AdminRoute'
import AdminDashboard from './components/auth/AdminDashboard'
import CreateCategory from './components/admin/CreateCategory'
import CreateProduct from './components/admin/CreateProduct'
import ProductDetail from './components/ProductDetail'
import Shop from './components/Shop'
import Cart from './components/Cart'

const Routes = () =>{
  return(
    <>
    <Router>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path = "/signup" component ={Signup}/>
    <Route exact path="/email/confirmation/:token" component={Confirm}/>
    <Route exact path="/signin" component={Signin}/>
    <Route exact path = "/forgetpassword" component={Forgetpassword}/>
    <Route exact path = "/reset/password/:token" component={Resetpassword}/>
    <Route exact path="/productdetails/:productId" component={ProductDetail}/>
    <Route exact path="/shop" component={Shop}/>
    <Route exact path="/cart" component={Cart}/>

    <PrivateRoute exact path = "/user/dashboard" component={UserDashboard}/>
    <AdminRoute exact path ="/admin/dashboard" component={AdminDashboard}/>
    <AdminRoute exact path ="/create/category" component={CreateCategory}/>
    <AdminRoute exact path ="/create/product" component={CreateProduct}/>
    </Switch>

    </Router>

    </>
  )
}


export default Routes
