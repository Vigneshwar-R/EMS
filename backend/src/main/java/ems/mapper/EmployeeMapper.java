package ems.mapper;

import ems.dto.EmployeeDto;
import ems.model.Employee;

public class EmployeeMapper
{
    public static EmployeeDto mapToEmployeeDto(Employee employee)
    {
        return new EmployeeDto(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail());
    }

    public static Employee mapToEmployeeEntity(EmployeeDto employeeDto)
    {
        return new Employee(employeeDto.getId(),employeeDto.getFirstName(),employeeDto.getLastName(),employeeDto.getEmail());
    }
}
