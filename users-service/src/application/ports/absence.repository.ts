import { Absence } from "@/domain/entities/absence"

export interface AbsenceRepository {
    create(data: Absence): Promise<void>
    delete(id: string): Promise<void>
}
