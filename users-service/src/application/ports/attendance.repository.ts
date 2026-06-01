import { Attendance } from "@/domain/entities/attendance"

export interface AttendanceRepository {
    readAll(year: number, month: number): Promise<Attendance[]>
}
