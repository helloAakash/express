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
    <Route exact path = "/resetpassword" component={Resetpassword}/>

    <PrivateRoute exact path = "/user/dashboard" component={UserDashboard}/>
    </Switch>

    </Router>

    </>
  )
}

export default Routes
