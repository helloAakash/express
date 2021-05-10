import React from 'react'
import Navbar from '../../layouts/Navbar';

import {isAuthenticated} from '../auth';

const UserDashboard=()=> {
const{user:{name,email,role}}=isAuthenticated()
    return (
        <>
      <Navbar/>
        <div className="container">
        <div className="row">
            <div className="col-md-4">

            </div>
            <div className="col-md-6">
            <div className="card mb-5">
    <h3 className="card-header">User Information</h3>
    <ul className="list-group">
        <li className="list-group-item">{name}</li>
        
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role===1 ? 'Admin':'Registered User'}</li>

    </ul>
</div>

 <div className="card mb-5">
<h3 className="card-header">Purchase History</h3>
<ul className="list-group">
        <li className="list-group-item">history</li>
    </ul>
 </div>

            </div>
        </div>
        
 </div>
 
        
            
        </>
    )
}

export default UserDashboard