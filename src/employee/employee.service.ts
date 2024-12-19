import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IEmployee } from "./employee.interface";
import { Model } from "mongoose";
import { CreateEmployeeDto } from "src/Dto/create-employee.dto";
import { UpdateEmployeeDto } from "src/Dto/update-employee.dto";

@Injectable() 
export class EmployeeService {

    constructor(@InjectModel('Employee') private employeeModel: Model<IEmployee>) {}

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<IEmployee> {
        const newEmployee = await new this.employeeModel(createEmployeeDto);
        return newEmployee.save();
    }

    async updateEmployee(
        EmployeeId: string,
        updateEmployeeDto: UpdateEmployeeDto,
      ): Promise<IEmployee> {
        const existingEmployee = await this.employeeModel.findByIdAndUpdate(
            EmployeeId,
          updateEmployeeDto,
          { new: true },
        );
        if (!existingEmployee) {
          throw new NotFoundException(`Student #${EmployeeId} not found`);
        }
        return existingEmployee;
      }

      async getAllEmployees(): Promise<IEmployee[]> {
        const studentData = await this.employeeModel.find();
        if (!studentData || studentData.length == 0) {
          throw new NotFoundException('Students data not found!');
        }
        return studentData;
      }
      async getEmployee(studentId: string): Promise<IEmployee> {
        const existingStudent = await this.employeeModel.findById(studentId).exec();
        if (!existingStudent) {
          throw new NotFoundException(`Student #${studentId} not found`);
        }
        return existingStudent;
      }
      async deleteEmployee(studentId: string): Promise<IEmployee> {
        const deletedStudent = await this.employeeModel.findByIdAndDelete(studentId);
        if (!deletedStudent) {
          throw new NotFoundException(`Student #${studentId} not found`);
        }
        return deletedStudent;
      }

}