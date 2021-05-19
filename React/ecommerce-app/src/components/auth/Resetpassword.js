import React,{useState,useEffect} from 'react';
import Navbar from '../../layouts/Navbar'
import {API} from '../../config'

const Resetpassword = ({match})=>{

	const [values, setValues] = useState({
        email:'',password:'',cpassword:'',error: '', success: false
       });
   
       const {email,password,cpassword,success, error } = values;
    
       const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }
    
    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: false });
        const token = match.params.token
         
       fetch(`${API}/resetpassword/${token}`,{
           method:"PUT",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
       })
       .then(res => res.json())
         .then(data => {
   
           if (data.error) {
               setValues({ ...values, error: data.error, success: false })
           }
           else {
               setValues({
                   ...values,
                   error:'',email:'',password:'',cpassword:'', success: true
               })
           }
   
           
         })
         .catch(err => console.log(err))
        
   
    }

	const showError=()=>(
           
		<div className="alert alert-danger" style={{display:error?'':'none'}}>
			{error}
		</div>
	   
	);
   
	const showSuccess=()=>(
	 
		<div className="alert alert-success" style={{display:success?'':'none'}}>
		   Password has been reset successfully you can login to continue
		</div>
	 
	);


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
					{showError()}
					{showSuccess()}
					<form>
						<div className="form-group">
							<label className="col-form-label">Email</label>
							<input type="email" onChange={handleChange('email')} value={email} className="form-control" placeholder=" " name="Email" required=""/>
						</div>
						<div className="form-group">
							<label className="col-form-label">Password</label>
							<input type="password" onChange={handleChange('password')} value={password} className="form-control" placeholder=" " name="Password" id="password1" required=""/>
						</div>
						<div className="form-group">
							<label className="col-form-label">Confirm Password</label>
							<input type="password" onChange={handleChange('cpassword')} value={cpassword}  className="form-control" placeholder=" " name="Confirm Password" id="password2" required=""/>
						</div>
						<div className="right-w3l">
							<button className="btn btn-primary" onClick={clickSubmit}>ResetPassword</button>
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
