import { Controller, Post, Body, Delete, Param, Inject } from "@nestjs/common"
import { TypeORMEmployeeRepository } from "../services/typeorm-employee.repository.js"
import { type CreateEmployeeDTO } from "../dtos/create-employee.dto.js"
import { randomUUID } from "crypto"

@Controller("employees")
export class EmployeeController {
    constructor(
        @Inject(TypeORMEmployeeRepository)
        private readonly repository: TypeORMEmployeeRepository
    ) {}

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
