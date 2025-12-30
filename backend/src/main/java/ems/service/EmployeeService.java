package ems.service;
import java.util.List;

import ems.dto.EmployeeDto;
import org.springframework.stereotype.Service;


public interface EmployeeService
{
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployee(Long id);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long id , EmployeeDto updatedEmployeeDto);
    void deleteEmployee(Long id);
}
