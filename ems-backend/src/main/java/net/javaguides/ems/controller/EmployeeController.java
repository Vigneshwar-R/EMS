package net.javaguides.ems.controller;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController
{
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService){this.employeeService = employeeService;}

    //Create Employee RestAPI
    @PostMapping("/")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto)
    {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);

    }

    //Get employee by id RestAPI
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long id)
    {
        EmployeeDto savedEmployee = employeeService.getEmployee(id);
        return new ResponseEntity<>(savedEmployee,HttpStatus.NOT_FOUND);
    }

    //Get all the employees RestAPI
    @GetMapping("/AllEmployees")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees()
    {
        List<EmployeeDto> AllEmployees = employeeService.getAllEmployees();
        return ResponseEntity.ok(AllEmployees);
    }

    // Update existing employee using ID RestAPI
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long id , @RequestBody EmployeeDto updatedEmployeeDto)
    {
        EmployeeDto update = employeeService.updateEmployee(id,updatedEmployeeDto);
        return ResponseEntity.ok(update);
    }

    //Delete existing employee using ID RestAPI
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id)
    {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee Deleted Successfully");
    }


}
