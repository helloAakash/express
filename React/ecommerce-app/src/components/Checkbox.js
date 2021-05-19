import React,{useState,useEffect} from 'react'

const Checkbox=({categories,handleFilters})=>{

    const [checked,setChecked]=useState([])

    const handleToggle=c=>()=>{
        // return first index or -1
     const currentCategoryId=checked.indexOf(c)
     const newCheckedcategoryId=[...checked]
     //if current checked wasnot already in checked state>push
     //else pull/take off
      if(currentCategoryId===-1){
          newCheckedcategoryId.push(c)
      }else{
          newCheckedcategoryId.splice(currentCategoryId,1)
      }
    //   console.log(newCheckedcategoryId)
      setChecked(newCheckedcategoryId)
      handleFilters(newCheckedcategoryId,1);

    }

    return categories.map((c,i)=>(
        <li key={i} className="list-unstyle">
          <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id===-1)} type="checkbox" className="checked" />
          <span className="span">{c.category_name}</span>  
        </li>
    ))
}

export default Checkbox;