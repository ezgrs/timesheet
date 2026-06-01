import { Employee } from "@/domain/entities/employee"

export interface EmployeeRepository {
    create(data: Employee): Promise<void>
    delete(id: string): Promise<void>
}
