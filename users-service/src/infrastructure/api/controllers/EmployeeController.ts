import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common'
import { TypeORMEmployeeStore } from '../services/TypeORMEmployeeStore';
import { type CreateEmployeeDTO } from '../dtos/CreateEmployeeDTO';
import { randomUUID } from 'crypto';

@Controller('employees')
export class EmployeeController {
  constructor(private store: TypeORMEmployeeStore) {}

  @Post()
  async create(@Body() dto: CreateEmployeeDTO) {
    await this.store.create({
        id: randomUUID(),
        name: dto.name,
        code: dto.code,
        role: dto.role,
    })
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    const id: string = params.id
    await this.store.delete(id) 
  }
}