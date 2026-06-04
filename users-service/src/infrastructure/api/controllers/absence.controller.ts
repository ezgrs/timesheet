import { Controller, Post, Body, Delete, Param, Inject } from "@nestjs/common"
import { TypeORMAbsenceRepository } from "../services/typeorm-absence.repository.js"
import { CreateAbsenceDTO } from "../dtos/create-absence.dto.js"
import { randomUUID } from "crypto"

@Controller("absences")
export class AbsenceController {
    constructor(
        @Inject(TypeORMAbsenceRepository)
        private readonly repository: TypeORMAbsenceRepository,
    ) {}

    @Post()
    async create(@Body() dto: CreateAbsenceDTO): Promise<string> {
        const id = randomUUID()
        await this.repository.create({
            id: id,
            employeeId: dto.employeeId,
            startDate: dto.startDate,
            endDate: dto.endDate,
            reason: dto.reason ?? null,
        })
        return id
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        await this.repository.delete(id)
    }
}
