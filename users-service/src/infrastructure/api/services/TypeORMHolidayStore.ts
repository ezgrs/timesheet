import { Injectable } from "@nestjs/common"
import { HolidayStore } from "../../../application/ports/HolidayStore"
import { Holiday } from "../../../domain/entities/Holiday"
import { HolidayMapper } from "../../db/mappers/HolidayMapper"
import { HolidayEntity } from "../../db/entities/HolidayEntity"
import { Between, DataSource } from "typeorm"

@Injectable()
export class TypeORMHolidayStore implements HolidayStore {
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
