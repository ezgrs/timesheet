import { Controller, Post, Body, Delete, Param, Inject } from "@nestjs/common"
import { TypeORMAbsenceRepository } from "../services/typeorm-absence.repository.js"
import { type CreateAbsenceDTO } from "../dtos/create-absence.dto.js"
import { randomUUID } from "crypto"

@Controller("absences")
export class AbsenceController {
    constructor(
        @Inject(TypeORMAbsenceRepository)
        private readonly repository: TypeORMAbsenceRepository,
    ) {}

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
