import {
    Controller,
    Post,
    Body,
    Delete,
    Param,
    Inject,
    Get,
} from "@nestjs/common"
import { TypeORMHolidayRepository } from "../services/typeorm-holiday.repository.js"
import { CreateHolidayDTO } from "../dtos/create-holiday.dto.js"
import { randomUUID } from "crypto"
import { Holiday } from "@/domain/entities/holiday.js"

@Controller("holidays")
export class HolidayController {
    constructor(
        @Inject(TypeORMHolidayRepository)
        private readonly repository: TypeORMHolidayRepository,
    ) {}

    @Get(":year/:month")
    async readAll(
        @Param("year") year: number,
        @Param("month") month: number,
    ): Promise<Holiday[]> {
        return await this.repository.readAll(year, month)
    }

    @Post()
    async create(@Body() dto: CreateHolidayDTO) {
        await this.repository.create({
            id: randomUUID(),
            name: dto.name,
            date: dto.date,
            shift: dto.shift ?? null,
        })
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        await this.repository.delete(id)
    }
}
