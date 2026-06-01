import { Injectable } from "@nestjs/common"
import { HolidayRepository } from "@/application/ports/holiday.repository.js"
import { Holiday } from "@/domain/entities/holiday.js"
import { HolidayMapper } from "@/infrastructure/db/mappers/holiday.mapper.js"
import { HolidayEntity } from "@/infrastructure/db/entities/holiday.entity.js"
import { Between, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class TypeORMHolidayRepository implements HolidayRepository {
    constructor(
        @InjectRepository(HolidayEntity)
        private readonly repository: Repository<HolidayEntity>,
    ) {}

    async create(data: Holiday): Promise<void> {
        const entity = HolidayMapper.toEntity(data)
        await this.repository.save(entity)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id })
    }

    async readAll(year: number, month: number): Promise<Holiday[]> {
        const entities = await this.repository.find({
            where: {
                date: Between(
                    new Date(Date.UTC(year, month - 1, 1)),
                    new Date(Date.UTC(year, month, 1)),
                ),
            },
        })
        return entities.map(HolidayMapper.toDomain)
    }
}
