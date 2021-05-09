import React, {
  useState,
  useEffect
} from 'react'
import {
  API
} from '../../config';

import Signin from './Signin';
const Confirm = ({
  match
}) => {
  const [values, setValues] = useState({
    error: '',
    success: false
  });

  const {
    success,
    error
  } = values;
  useEffect(() => {

    const token = match.params.token
    console.log(token)
    fetch(`${API}/confirmation/${token}`,{
          method: "POST",
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
          }
        })
      .then(res => res.json())
      .then(data => {

        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false
          })
        } else {
          setValues({
            ...values,
            error: '',
            success: true
          })
        }


      })
      .catch(err => console.log(err))





  }, [match.params.token, values])

  const showError = () => (

    <
    div className = "alert alert-danger"
    style = {
      {
        display: error ? '' : 'none'
      }
    } > {
      error
    } <
    /div>

  );

  const showSuccess = () => (

    <
    div className = "alert alert-success"
    style = {
      {
        display: success ? '' : 'none'
      }
    } >
    Congrats your Account is verified you can sign in to
    continue ....... <
      /div>

  );

  return ( <
    >

    {
      showError()
    } {
      showSuccess()
    }


    <
    Signin / >


    <
    />
  )
}

export default Confirm
