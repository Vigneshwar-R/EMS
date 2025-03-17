import axios from "axios";

export const ListEmployees = () =>  axios.get("/api/employees/AllEmployees");  
export const CreateEmployees = (employee) => axios.post("/api/employees",employee);
export const getEmployee = (id) => axios.get("/api/employees" + "/" + id);
export const UpdateEmployee = (id,employee) => axios.put("/api/employees" + "/" + id,employee)
export const DeleteEmployee = (id) => axios.delete("/api/employees" + "/" + id)
