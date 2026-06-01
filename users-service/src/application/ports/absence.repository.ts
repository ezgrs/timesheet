import { Absence } from "@/domain/entities/absence.js"

export interface AbsenceRepository {
    create(data: Absence): Promise<void>
    delete(id: string): Promise<void>
}
