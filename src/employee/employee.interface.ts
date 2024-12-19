import { Document } from 'mongoose';
export interface IEmployee extends Document{
    readonly name: string;
    readonly designation: string;
    readonly department: string;
    readonly gender: string;
    readonly salary: number;
}