import { Employee } from "@/domain/entities/employee.js"

export interface EmployeeRepository {
    create(data: Employee): Promise<void>
    delete(id: string): Promise<void>
}
