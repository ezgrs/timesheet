import { Employee } from "../../domain/entities/Employee"

export interface EmployeeStore {
    create(data: Employee): Promise<void>
    delete(id: string): Promise<void>
}
