import React from 'react';
import Navbar from '../../layouts/Navbar'
import {Link} from 'react-router-dom'

const Signin = ()=>{
  return (
  <>
  <Navbar/>

  <div>
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">SignIn</h5>

				</div>
				<div className="modal-body">
					<form action="#" method="post">

						<div className="form-group">
							<label className="col-form-label">Email</label>
							<input type="email" className="form-control" placeholder=" " name="Email" required=""/>
						</div>
						<div className="form-group">
							<label className="col-form-label">Password</label>
							<input type="password" className="form-control" placeholder=" " name="Password" id="password1" required=""/>
						</div>
						<div className="right-w3l">
							<input type="submit" className="form-control" value="Login"/>
						</div>
						<div className="sub-w3l">
							<div className="custom-control custom-checkbox mr-sm-2">
								<input type="checkbox" className="custom-control-input" id="customControlAutosizing2"/>
								<label className="custom-control-label" for="customControlAutosizing2">Remember me</label>
							</div>
						</div>
            <p className="text-center mt-3">Forgot Password ?
            <Link to="/forgetpassword">ForgetPassword</Link>
            </p>
					</form>
				</div>
			</div>
		</div>
	</div>

  </>
  )
}

export default Signin
