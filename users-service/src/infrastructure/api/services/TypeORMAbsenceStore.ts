import { Injectable } from "@nestjs/common"
import { AbsenceStore } from "../../../application/ports/AbsenceStore"
import { Absence } from "../../../domain/entities/Absence"
import { AbsenceMapper } from "../../db/mappers/AbsenceMapper"
import dataSource from "../../db/data-source"
import { AbsenceEntity } from "../../db/entities/AbsenceEntity"

@Injectable()
export class TypeORMAbsenceStore implements AbsenceStore {
    async create(data: Absence): Promise<void> {
        const entity = AbsenceMapper.toEntity(data)
        await entity.save()
    }

    async delete(id: string): Promise<void> {
        await dataSource.manager.delete(AbsenceEntity, { id })
    }
}
