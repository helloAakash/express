import React, { useState } from 'react';
import Navbar from '../../layouts/Navbar'
import { forgetpassword } from './index'

const Forgetpassword = () => {

	const [values, setValues] = useState({
		email: '', error: '', loading: false, success: false
	});
	const { email, loading, error, success } = values;

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	}

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		forgetpassword({ email })
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false, success: false })
				}
				else {

					setValues({
						...values,
						email: '', error: '', success: true
					})
				}
			});
	};

	const showError = () => (
		<div className="alert alert-danger mb-3" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (<div className="alert alert-info">
			<h2>Loading....</h2>
		</div>
		);
	const showSuccess = () => (

		<div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
			password reset verification link has been sent to your email
		</div>

	);

	return (
		<>
			<Navbar />
			<div>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Forgot Password</h5>

						</div>
						<div className="modal-body">
							{showError()}
							{showLoading()}
							{showSuccess()}
							<form>

								<div className="form-group">
									<label className="col-form-label">Email</label>
									<input type="email" onChange ={handleChange('email')} value={email} className="form-control" placeholder=" " name="Email" required="" />
								</div>
								<div className="right-w3l">
									<button className="form-control" onClick={clickSubmit}>Send Password Reset Link</button>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Forgetpassword
