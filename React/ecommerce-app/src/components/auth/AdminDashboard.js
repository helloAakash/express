import React from 'react'
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import Navbar from '../../layouts/Navbar';


const AdminDashboard=()=> {
 const{user:{name,email,role}}=isAuthenticated()
    return (
        <>
        <Navbar/>
        <div className="container">
        <div className="row">
            <div className="col-md-4">
            <div className="card">
            <h4 className="card-header">Admin Links</h4>
           <ul className="list-group">
          <li className="list-group-item">
              <Link className="nav-link" to="/create/category">Create Category</Link>
          </li>
          <li className="list-group-item">
              <Link className="nav-link" to="/create/product">Create Products</Link>
          </li>
           </ul>
        </div>

            </div>
            <div className="col-md-6">
            <div className="card mb-5">
    <h3 className="card-header">Admin Information</h3>
    <ul className="list-group">
        <li className="list-group-item">{name}</li>
        
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role===1 ? 'Admin':'Registered User'}</li>

    </ul>
</div>

 

            </div>
        </div>
        
 </div>
            
        </>
    )
}

export default AdminDashboard