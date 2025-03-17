import React, { useEffect, useState } from "react" ;
import { DeleteEmployee, ListEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import EmployeeComponent from "./EmployeeComponent";

const ListEmployeeComponent = () => {

 const [employee , setEmployee] = useState([])

 const navigator = useNavigate()

 useEffect(() => {
  
    getAllEmployees();

  }   , []);

  function getAllEmployees()
  {
    ListEmployees()
    .then((response) => {
      
        setEmployee(response.data);  
      
    })
    .catch((error) => {

      console.error('Error fetching employees:');
    });

  }
  
  function addNewEmployee()
  {
   navigator('/add-employee')
  }

  function updateEmployee(id)
  {
    navigator(`/edit-employee/${id}`)
  }

  function removeEmployee(id)
  {
    DeleteEmployee(id).then((response) => {

        getAllEmployees()
    })
    .catch(error => console.error(error))
  }

    
  return (
    <div className = 'container'>
        <br></br>
        <div className='card'>
        <h2 className='card-header mb-4'><center>List of Employees</center></h2>
        <button type="button" className="btn btn-primary mb-2 col-md-1 " onClick={addNewEmployee} style={{marginLeft: '16px'}}>Add Employee</button>
        <div className='card-body'>
        <table className='table table-secondary table-striped table-bordered'>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {

                employee.map((employee) =>
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => updateEmployee(employee.id) }>Update</button>
                            <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
                        
                        </td>
                        
                    </tr>                    
                )

                }
            </tbody>

        </table>
        </div>
        </div>
    </div>
  )
}

export default ListEmployeeComponent