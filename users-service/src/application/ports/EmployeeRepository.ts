import { Employee } from "../../domain/entities/Employee"

export interface EmployeeRepository {
    create(data: Employee): Promise<void>
    delete(id: string): Promise<void>
}
