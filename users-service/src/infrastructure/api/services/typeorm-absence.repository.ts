import { Injectable } from "@nestjs/common"
import { AbsenceRepository } from "@/application/ports/absence.repository.js"
import { Absence } from "@/domain/entities/absence.js"
import { AbsenceMapper } from "@/infrastructure/db/mappers/absence.mapper.js"
import { AbsenceEntity } from "@/infrastructure/db/entities/absence.entity.js"
import { DataSource } from "typeorm"

@Injectable()
export class TypeORMAbsenceRepository implements AbsenceRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(data: Absence): Promise<void> {
        const entity = AbsenceMapper.toEntity(data)
        await entity.save()
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.manager.delete(AbsenceEntity, { id })
    }
}
