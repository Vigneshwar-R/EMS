package net.javaguides.ems.service.implementation;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.model.Employee;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class EmployeeServiceImplementation implements EmployeeService
{

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImplementation(EmployeeRepository employeeRepository)
    {this.employeeRepository = employeeRepository;}



    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto)
    {
        Employee employee = EmployeeMapper.mapToEmployeeEntity(employeeDto);

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }


    @Override
    public EmployeeDto getEmployee(Long id)
    {
        Employee savedEmployee = employeeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Employee does not exist!") );

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);

    }

    @Override
    public List<EmployeeDto> getAllEmployees()
    {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());

    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto updatedEmployeeDto)
    {
      Employee employee = employeeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("User does not exist") );

      employee.setFirstName(updatedEmployeeDto.getFirstName());
      employee.setLastName(updatedEmployeeDto.getLastName());
      employee.setEmail(updatedEmployeeDto.getEmail());

      Employee upd_emp = employeeRepository.save(employee);

      return EmployeeMapper.mapToEmployeeDto(upd_emp);

    }

    @Override
    public void deleteEmployee(Long id)

    {
      Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User does not exist"));
      employeeRepository.delete(employee);
    }


}
