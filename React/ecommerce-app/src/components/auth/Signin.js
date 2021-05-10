import React, { useState } from 'react';
import Navbar from '../../layouts/Navbar'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from './index'

const Signin = () => {

	const [values, setValues] = useState({
		email: '', password: '', error: '', loading: false, redirectToReferrer: false,
	});
	const { email, password, loading, error, redirectToReferrer } = values;

	const { user } = isAuthenticated();

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	}

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false })
				}
				else {
					authenticate(data, () => {
						setValues({
							...values,
							redirectToReferrer: true
						});
					});
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
	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />
			} else {
				return <Redirect to="/user/dashboard" />
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />
		}



	}



	return (
		<>
			<Navbar />

			<div>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">SignIn</h5>

						</div>
						<div className="modal-body">
							{showLoading()}
							{showError()}
							{redirectUser()}
							<form>

								<div className="form-group">
									<label className="col-form-label">Email</label>
									<input type="email" onChange={handleChange('email')} value={email} className="form-control" placeholder=" " name="Email" required="" />
								</div>
								<div className="form-group">
									<label className="col-form-label">Password</label>
									<input type="password" onChange={handleChange('password')} value={password} className="form-control" placeholder=" " name="Password" id="password1" required="" />
								</div>
								<div className="right-w3l">
									<button className="btn btn-info" onClick={clickSubmit}>Login</button>
								</div>
								<div className="sub-w3l">
									<div className="custom-control custom-checkbox mr-sm-2">
										<input type="checkbox" className="custom-control-input" id="customControlAutosizing2" />
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
