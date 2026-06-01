import { Employee } from "../../../domain/entities/Employee";
import { EmployeeEntity } from "../entities/EmployeeEntity";

export namespace EmployeeMapper {
  export function toDomain(entity: EmployeeEntity): Employee {
    return {
        id: entity.id,
        name: entity.name,
        code: entity.code,
        role: entity.role,
    }
  }

  export function toEntity(domain: Employee): EmployeeEntity {
    const entity = new EmployeeEntity()
    entity.id = domain.id
    entity.name = domain.name
    entity.code = domain.code
    entity.role = domain.role
    return entity
  }
}