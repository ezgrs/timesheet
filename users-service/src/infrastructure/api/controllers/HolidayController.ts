import { Controller, Post, Body, Delete, Param } from '@nestjs/common'
import { TypeORMHolidayStore } from '../services/TypeORMHolidayStore';
import { type CreateHolidayDTO } from '../dtos/CreateHolidayDTO';
import { randomUUID } from 'crypto';

@Controller('holidays')
export class HolidayController {
  constructor(private store: TypeORMHolidayStore) {}

  @Post()
  async create(@Body() dto: CreateHolidayDTO) {
    await this.store.create({
        id: randomUUID(),
        name: dto.name,
        date: dto.date,
        shift: dto.shift ?? null,
    })
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    const id: string = params.id
    await this.store.delete(id)
  }
}