import { Absence } from "../../domain/entities/Absence"

export interface AbsenceRepository {
    create(data: Absence): Promise<void>
    delete(id: string): Promise<void>
}
