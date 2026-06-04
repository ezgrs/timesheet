import { Controller, Post, Body, Delete, Param, Inject } from "@nestjs/common"
import { TypeORMEmployeeRepository } from "../services/typeorm-employee.repository.js"
import { CreateEmployeeDTO } from "../dtos/create-employee.dto.js"
import { randomUUID } from "crypto"

@Controller("employees")
export class EmployeeController {
    constructor(
        @Inject(TypeORMEmployeeRepository)
        private readonly repository: TypeORMEmployeeRepository,
    ) {}

    @Post()
    async create(@Body() dto: CreateEmployeeDTO) {
        const id = randomUUID()
        await this.repository.create({
            id: id,
            name: dto.name,
            code: dto.code,
            role: dto.role,
        })
        return id
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        await this.repository.delete(id)
    }
}
