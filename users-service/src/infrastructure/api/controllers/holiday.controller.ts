import { Controller, Post, Body, Delete, Param } from "@nestjs/common"
import { TypeORMHolidayRepository } from "../services/typeorm-holiday.repository.js"
import { type CreateHolidayDTO } from "../dtos/create-holiday.dto.js"
import { randomUUID } from "crypto"

@Controller("holidays")
export class HolidayController {
    constructor(private repository: TypeORMHolidayRepository) {}

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
    async delete(@Param() params: any) {
        const id: string = params.id
        await this.repository.delete(id)
    }
}
