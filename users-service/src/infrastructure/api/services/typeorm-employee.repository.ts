import { Injectable } from "@nestjs/common"
import { EmployeeRepository } from "@/application/ports/employee.repository"
import { Employee } from "@/domain/entities/employee"
import { EmployeeMapper } from "@/infrastructure/db/mappers/employee.mapper"
import { EmployeeEntity } from "@/infrastructure/db/entities/employee.entity"
import { DataSource } from "typeorm"

@Injectable()
export class TypeORMEmployeeRepository implements EmployeeRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(data: Employee): Promise<void> {
        const entity = EmployeeMapper.toEntity(data)
        await entity.save()
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.manager.delete(EmployeeEntity, { id })
    }
}
