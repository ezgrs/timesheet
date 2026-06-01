import { Injectable } from "@nestjs/common"
import { AbsenceRepository } from "../../../application/ports/AbsenceRepository"
import { Absence } from "../../../domain/entities/Absence"
import { AbsenceMapper } from "../../db/mappers/AbsenceMapper"
import { AbsenceEntity } from "../../db/entities/AbsenceEntity"
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
