import React from 'react'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/auth/Signup'
import Signin from './components/auth/Signin'
import Forgetpassword from './components/auth/Forgetpassword'

const Routes = () =>{
  return(
    <>
    <Router>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path = "/signup" component ={Signup}/>
    <Route exact path="/signin" component={Signin}/>
    <Route exact path = "/forgetpassword" component={Forgetpassword}/>
    <Route exact path = "/forgetpassword" component={Resetpassword}/>
    </Switch>

    </Router>

    </>
  )
}

export default Routes
