import { Injectable } from "@nestjs/common"
import { EmployeeRepository } from "../../../application/ports/EmployeeRepository"
import { Employee } from "../../../domain/entities/Employee"
import { EmployeeMapper } from "../../db/mappers/EmployeeMapper"
import { EmployeeEntity } from "../../db/entities/EmployeeEntity"
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
