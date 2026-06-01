import { Attendance } from "@/domain/entities/attendance.js"

export interface AttendanceRepository {
    readAll(year: number, month: number): Promise<Attendance[]>
}
