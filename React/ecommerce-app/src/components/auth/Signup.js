import React,{useState} from 'react';
import Navbar from '../../layouts/Navbar'
import {signup} from '../auth'

const Signup = ()=>{
  const [values,setValues]=useState({
    name:'',email:'',password:'',error:'',success:false
  })

  const {name,email,password,error,success}=values

  const handleChange=name=>event=>{

    setValues({...values,error:false,[name]:event.target.value})
  }


  const clickSubmit=(event)=>{
    event.preventDefault();
    setValues({...values,error:false})
    signup({name,email,password})
    .then (data=>{
      if(data.error){
        setValues({...values,error:data.error,success:false})
      }
      else{
        setValues({...values,name:'',email:'',password:'',success:true})
      }
    })
  }


  //to show error message
  const showError=()=>(
    <div className="alert alert-danger" style={{display:error?'':'none'}}>
      {error}
    </div>

  )


  //to show success message
  const showSuccess=()=>(
    <div className = "alert alert-info" style={{display:success?'':'none'}}>
      New account has been created verify your account
    </div>
  )





  return (
  <>
  <Navbar/>

  <div>
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Register</h5>

				</div>
				<div className="modal-body">
          {showError()}
          {showSuccess()}
          <form>
						<div className="form-group">
							<label className="col-form-label">Your Name</label>
							<input type="text" onChange ={handleChange('name')} value={name} className="form-control" placeholder=" " name="Name" required=""/>
						</div>
						<div className="form-group">
							<label className="col-form-label">Email</label>
							<input type="email" onChange ={handleChange('email')} value={email} className="form-control" placeholder=" " name="Email" required=""/>
						</div>
						<div className="form-group">
							<label className="col-form-label">Password</label>
							<input type="password" onChange ={handleChange('password')} value={password} className="form-control" placeholder=" " name="Password" id="password1" required=""/>
						</div>
						<div className="form-group">
							<label className="col-form-label">Confirm Password</label>
							<input type="password" className="form-control" placeholder=" " name="Confirm Password" id="password2" required=""/>
						</div>
						<div className="right-w3l">
							<button className="btn btn-primary" onClick={clickSubmit}>Register</button>
						</div>
						<div className="sub-w3l">
							<div className="custom-control custom-checkbox mr-sm-2">
								<input type="checkbox" className="custom-control-input" id="customControlAutosizing2"/>
								<label className="custom-control-label" for="customControlAutosizing2">I Accept to the Terms & Conditions</label>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

  </>
  )
}

export default Signup
