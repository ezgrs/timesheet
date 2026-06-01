import { Attendance } from "../../domain/entities/Attendance"

export interface AttendanceRepository {
    readAll(year: number, month: number): Promise<Attendance[]>
}
