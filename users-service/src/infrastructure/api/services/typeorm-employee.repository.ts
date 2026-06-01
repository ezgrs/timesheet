import { Injectable } from "@nestjs/common"
import { EmployeeRepository } from "@/application/ports/employee.repository.js"
import { Employee } from "@/domain/entities/employee.js"
import { EmployeeMapper } from "@/infrastructure/db/mappers/employee.mapper.js"
import { EmployeeEntity } from "@/infrastructure/db/entities/employee.entity.js"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class TypeORMEmployeeRepository implements EmployeeRepository {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly repository: Repository<EmployeeEntity>,
    ) {}

    async create(data: Employee): Promise<void> {
        const entity = EmployeeMapper.toEntity(data)
        await this.repository.save(entity)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id })
    }
}
