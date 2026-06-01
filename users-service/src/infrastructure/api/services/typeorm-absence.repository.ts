import { Injectable } from "@nestjs/common"
import { AbsenceRepository } from "@/application/ports/absence.repository"
import { Absence } from "@/domain/entities/absence"
import { AbsenceMapper } from "@/infrastructure/db/mappers/absence.mapper"
import { AbsenceEntity } from "@/infrastructure/db/entities/absence.entity"
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
