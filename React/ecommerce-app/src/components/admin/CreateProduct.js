import React,{useState,useEffect} from 'react'
import Navbar from '../../layouts/Navbar';
import {getCategories,createProduct} from './apiAdmin'
import {isAuthenticated} from '../auth'
const CreateProduct = () => {
	const{user,token}=isAuthenticated();
    const [values,setValues]=useState({
        product_name:'',
        product_description:'',
        product_price:'',
        categories:[],
        category:'',
        product_quantity:'',
        product_image:'',
        error:'',
        success:false,
        formData:''
    })
    const {
        product_name,
        product_description,
        product_price,
        categories,
        category,
        product_quantity,
        error,
        success,
        formData

    } =values;

	//load categories and set form data
	const init=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            } else{
                setValues({...values,categories:data,formData:new FormData});
            }
        })
    }

    //to send form data
     useEffect(()=>{
       init();
     },[])


     const handleChange=name=>event=>{
        const value= name==='product_image' ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:'',loading:true});
        createProduct(user._id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                   ...values,product_name:'',product_description:'',product_image:'',product_price:'',product_quantity:'', category:'',
                   loading:false,success:true
                });
            }

        });
    };

	const showError=()=>(
           
		<div className="alert alert-danger" style={{display:error?'':'none'}}>
			{error}
		</div>
	   
	);
   
	const showSuccess=()=>(
	 
		<div className="alert alert-success" style={{display:success?'':'none'}}>
		 product added
		</div>
	 
	);




	return (
		<>
			<Navbar />
			<div>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Product</h5>
						</div>
						<div className="modal-body">
                            {showError()}
							{showSuccess()}
							<form>
								<div className="form-group">
									<label className="col-form-label">Product Name</label>
									<input type="text" onChange={handleChange('product_name')} value={product_name} className="form-control" placeholder=" " name="ProductName" required="" />
								</div>
								<div className="form-group">
									<label className="col-form-label">Product Price</label>
									<input type="number" onChange={handleChange('product_price')} value={product_price} className="form-control" placeholder=" " required="" />
								</div>
								<div className="form-group">
									<label className="col-form-label">Product Quantity</label>
									<input type="number" onChange={handleChange('product_quantity')} value={product_quantity} className="form-control" placeholder=" " required="" />
								</div>
								<div className="form-group">
									<label className="col-form-label">Product Description</label>
									<textarea onChange={handleChange('product_description')} value={product_description}  className="form-control" required=""></textarea>
								</div>
								<div className="form-group">
									<label className="col-form-label">Category</label>
									<select onChange={handleChange('category')}  className="form-control">
										<option></option>
										{categories && categories.map((c,i)=>(
										  <option key={i} value={c._id}>{c.category_name}</option>	
										))}

									</select>
								</div>
								<div className="form-group">
									<label className="col-form-label">Product Image</label>
									<input type="file" onChange={handleChange('product_image')}  className="form-control" placeholder=" " accept="image/*" required="" />
								</div>
								<div className="right-w3l">
									<button className="btn btn-warning" onClick={clickSubmit}>Add Product</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}

export default CreateProduct
