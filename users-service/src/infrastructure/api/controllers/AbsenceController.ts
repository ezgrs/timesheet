import { Controller, Post, Body, Delete, Param } from "@nestjs/common"
import { TypeORMAbsenceRepository } from "../services/TypeORMAbsenceRepository"
import { type CreateAbsenceDTO } from "../dtos/CreateAbsenceDTO"
import { randomUUID } from "crypto"

@Controller("absences")
export class AbsenceController {
    constructor(private repository: TypeORMAbsenceRepository) {}

    @Post()
    async create(@Body() dto: CreateAbsenceDTO) {
        await this.repository.create({
            id: randomUUID(),
            employeeId: dto.employeeId,
            startDate: dto.startDate,
            endDate: dto.endDate,
            reason: dto.reason ?? null,
        })
    }

    @Delete(":id")
    async delete(@Param() params: any) {
        const id: string = params.id
        await this.repository.delete(id)
    }
}
