import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common"
import { TypeORMEmployeeRepository } from "../services/typeorm-employee.repository"
import { type CreateEmployeeDTO } from "../dtos/create-employee.dto"
import { randomUUID } from "crypto"

@Controller("employees")
export class EmployeeController {
    constructor(private repository: TypeORMEmployeeRepository) {}

    @Post()
    async create(@Body() dto: CreateEmployeeDTO) {
        await this.repository.create({
            id: randomUUID(),
            name: dto.name,
            code: dto.code,
            role: dto.role,
        })
    }

    @Delete(":id")
    async delete(@Param() params: any) {
        const id: string = params.id
        await this.repository.delete(id)
    }
}
