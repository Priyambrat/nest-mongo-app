import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    StudentModule,
    EmployeeModule,

  ],
})
export class AppModule {}
