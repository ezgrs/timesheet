import { Injectable } from "@nestjs/common";
import { AbsenceStore } from "../../../application/ports/AbsenceStore";
import { Absence } from "../../../domain/entities/Absence";
import { AbsenceMapper } from "../mappers/AbsenceMapper";
import dataSource from "../data-source";
import { AbsenceEntity } from "../entities/AbsenceEntity";

@Injectable()
export class TypeORMAbsenceStore implements AbsenceStore {
    async create(data: Absence): Promise<void> {
        const entity = AbsenceMapper.toEntity(data)
        await entity.save()
    }

    async delete(id: string): Promise<void> {
        await dataSource.manager.delete(AbsenceEntity, {id})
    }
}