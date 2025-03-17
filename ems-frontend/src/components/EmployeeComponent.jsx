import React, { useEffect, useState } from 'react'
import { ListEmployees , CreateEmployees, getEmployee, UpdateEmployee } from '../services/EmployeeService'
import { useNavigate , useParams } from "react-router-dom";


const EmployeeComponent = () => {

  const navigator = useNavigate()

  const [firstName , setfirstName] = useState('')
  const [lastName , setlastName] = useState('')
  const [email , setemail] = useState('')

  const {id} = useParams();

  const [errors , setErrors] = useState({
    firstName : '',
    lastName:'',
    email: ''
  })


  useEffect(() => 
    {
      if(id)
        {
         getEmployee(id).then((response) => 
          {
            setfirstName(response.data.firstName);
            setlastName(response.data.lastName);
            setemail(response.data.email);
          }).catch(error => console.error(error)) 
        }
    } , [id])


  const handleFirstName = e => setfirstName(e.target.value)
  const handleLastName = e => setlastName(e.target.value)
  const handleEmail = e => setemail(e.target.value)

 
  const SaveOrUpdateEmployee = (e) => 
    
  {
    const employee = { firstName, lastName, email }; 
    console.log(employee); 

    if(validateForm())
      {
        {
          if(id)
            {
              UpdateEmployee(id,employee).then((response) => console.log(response.data)).catch((error) => console.error('Error updating employee'))
              navigator('/employees')

            } else 
            {
              CreateEmployees(employee).then((response) => console.log(response.data)).catch((error) => console.error('Error adding employee'))
              navigator('/employees')
            }

        }

        
  
      }

  };

  function validateForm()
  {
    let valid = true;

    errorsCopy = {...errors}

    if(firstName.trim()){
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required.'
      valid = false
    }

    if(lastName.trim())
      {
        errorsCopy.lastName = '';
      } else {
        errorsCopy.lastName = 'Last name is required.'
        valid = false
      }

    if(email.trim())
      {
        errorsCopy.email = '';
      } else {
        errorsCopy.email = 'email is required.'
        valid = false
      }


    setErrors(errorsCopy)

    return valid

  }

  function pageTitle()
  {
    if(id)
      {
        return <h2 className='card-header text-center'> Update Employee </h2>
      }
      else 
      {
       return <h2 className='card-header text-center'> Add Employee </h2>
      }
  }



  return (
    <div className='container'>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
          pageTitle()
          }
        <div className = 'card-body'>

          <form>
            <div className='form-group mb-2'>

              <label className='form-label'>First Name:</label>
              <input type='text' 
              placeholder='Enter first name' 
              name='firstName' 
              value={firstName} 
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              onChange={handleFirstName}>
              </input>
              { errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div> }
              </div>


              <div className='form-group mb-2'>
              <label className='form-label'>Last Name:</label>
              <input type='text' placeholder='Enter last name' name='lastName' value={lastName}            
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}` }
              onChange={handleLastName}>
              </input>
              {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
              </div>

              <div className='form-group mb-2'>
              <label className='form-label'>E-mail:</label>
              <input type='text' placeholder='Enter email' name='email' value={email} 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}              
               onChange={handleEmail}>
               </input>
               {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
              </div>

          </form>

          <button className='btn btn-success' onClick={SaveOrUpdateEmployee}>Submit</button>

        </div>
        
        </div>

      </div>
      
    </div>
  )
}

export default EmployeeComponent