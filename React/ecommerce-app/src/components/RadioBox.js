import React,{useState,useEffect, Fragment} from 'react';

const RadioBox=({prices,handleFilters})=>{
    const[value,setValue]=useState(0);

    const handleChange=event=>{
     handleFilters(event.target.value);
     setValue(event.target.value);
    }

    return prices.map((p,i)=>(
        <li key={i} className="list-unstyle">
          <input onChange={handleChange}  value={`${p._id}`} name={p} type="radio" />
          <span className="span">{p.name}</span>
        </li>
    ))
}

export default RadioBox;
