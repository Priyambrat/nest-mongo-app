import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Employee {
   @Prop()
   name: string;
   @Prop()
   designation: string;
   @Prop()
   department: string;
   @Prop()
   gender: string;
   @Prop()
   salary: number;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);