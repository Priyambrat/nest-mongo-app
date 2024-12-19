import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from 'src/Dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/Dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('create-employee')
  async createStudent(
    @Res() response,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    try {
      const newEmployee =
        await this.employeeService.createEmployee(createEmployeeDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Employee has been created successfully',
        newEmployee,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Employee not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') EmployeeId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const existingEmployee = await this.employeeService.updateEmployee(
        EmployeeId,
        updateEmployeeDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Employee has been successfully updated',
        existingEmployee,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @Get()
  async getStudents(@Res() response) {
    try {
      const employeeData = await this.employeeService.getAllEmployees();
      return response.status(HttpStatus.OK).json({
        message: 'All employees data found successfully',
        employeeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getStudent(@Res() response, @Param('id') employeeId: string) {
    try {
      const existingEmployee = await this.employeeService.getEmployee(employeeId);
      return response.status(HttpStatus.OK).json({
        message: 'Employee found successfully',
        existingEmployee,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') employeeId: string) {
    try {
      const deletedEmployee = await this.employeeService.deleteEmployee(employeeId);
      return response.status(HttpStatus.OK).json({
        message: 'Employee deleted successfully',
        deletedEmployee,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
