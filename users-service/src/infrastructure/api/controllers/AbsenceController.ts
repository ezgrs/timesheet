import { Controller, Post, Body, Delete, Param } from '@nestjs/common'
import { TypeORMAbsenceStore } from '../services/TypeORMAbsenceStore';
import { type CreateAbsenceDTO } from '../dtos/CreateAbsenceDTO';
import { randomUUID } from 'crypto';

@Controller('absences')
export class AbsenceController {
  constructor(private store: TypeORMAbsenceStore) {}

  @Post()
  async create(@Body() dto: CreateAbsenceDTO) {
    await this.store.create({
        id: randomUUID(),
        employeeId: dto.employeeId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        reason: dto.reason ?? null,
    })
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    const id: string = params.id
    await this.store.delete(id)
  }
}