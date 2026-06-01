import { Attendance } from "../../domain/entities/Attendance";

export interface AttendanceStore {
    readAll(year: number, month: number): Promise<Attendance[]>
}
