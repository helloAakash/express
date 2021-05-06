import React from 'react';
import Navbar from '../../layouts/Navbar'

const Resetpassword = ()=>{
  return (
  <>
  <Navbar/>

  <div>
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Reset Password</h5>

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
						<div className="form-group">
							<label className="col-form-label">Confirm Password</label>
							<input type="password" className="form-control" placeholder=" " name="Confirm Password" id="password2" required=""/>
						</div>
						<div className="right-w3l">
							<input type="submit" className="form-control" value="Reset Password"/>
						</div>

					</form>
				</div>
			</div>
		</div>
	</div>
  </>
  )
}

export default Resetpassword
