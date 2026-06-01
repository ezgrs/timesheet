import { Injectable } from "@nestjs/common";
import { EmployeeStore } from "../../../application/ports/EmployeeStore";
import { Employee } from "../../../domain/entities/Employee";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import dataSource from "../data-source";
import { EmployeeEntity } from "../entities/EmployeeEntity";

@Injectable()
export class TypeORMEmployeeStore implements EmployeeStore {
    async create(data: Employee): Promise<void> {
        const entity = EmployeeMapper.toEntity(data)
        await entity.save()
    }

    async delete(id: string): Promise<void> {
        await dataSource.manager.delete(EmployeeEntity, {id})
    }
}
