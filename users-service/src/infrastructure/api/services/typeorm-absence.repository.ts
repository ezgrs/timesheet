import { Injectable } from "@nestjs/common"
import { AbsenceRepository } from "@/application/ports/absence.repository.js"
import { Absence } from "@/domain/entities/absence.js"
import { AbsenceMapper } from "@/infrastructure/db/mappers/absence.mapper.js"
import { AbsenceEntity } from "@/infrastructure/db/entities/absence.entity.js"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class TypeORMAbsenceRepository implements AbsenceRepository {
    constructor(
        @InjectRepository(AbsenceEntity)
        private readonly repository: Repository<AbsenceEntity>,
    ) {}

    async create(data: Absence): Promise<void> {
        const entity = AbsenceMapper.toEntity(data)
        await this.repository.save(entity)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id })
    }
}
