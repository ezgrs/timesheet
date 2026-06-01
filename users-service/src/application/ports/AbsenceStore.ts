import { Absence } from "../../domain/entities/Absence"

export interface AbsenceStore {
    create(data: Absence): Promise<void>
    delete(id: string): Promise<void>
}
