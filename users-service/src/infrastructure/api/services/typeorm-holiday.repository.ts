import { Injectable } from "@nestjs/common"
import { HolidayRepository } from "@/application/ports/holiday.repository"
import { Holiday } from "@/domain/entities/holiday"
import { HolidayMapper } from "@/infrastructure/db/mappers/holiday.mapper"
import { HolidayEntity } from "@/infrastructure/db/entities/holiday.entity"
import { Between, DataSource } from "typeorm"

@Injectable()
export class TypeORMHolidayRepository implements HolidayRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(data: Holiday): Promise<void> {
        const entity = HolidayMapper.toEntity(data)
        await entity.save()
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.manager.delete(HolidayEntity, { id })
    }

    async readAll(year: number, month: number): Promise<Holiday[]> {
        const entities = await this.dataSource.manager.find(HolidayEntity, {
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
