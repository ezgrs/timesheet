import { Attendance } from "../../domain/entities/attendance"
import { Employee } from "../../domain/entities/employee"
import { ReadAbsencesDTOSchema } from "../dto/ReadAbsencesDto"
import { HTTPClient } from "../ports/http-client"

export class DataRepositoryUseCase {
    constructor(
        private readonly client: HTTPClient,
        private readonly baseURL: URL,
    ) {}

    async readAttendances(year: number, month: number): Promise<Attendance[]> {
        const url = new URL(this.baseURL)
        url.pathname = `/attendances/${year}/${month}`
        const data = await this.client.get(url)
        const dtos = ReadAbsencesDTOSchema.array().parse(data)
        return dtos.map((attendanceDto) => ({
            employee: attendanceDto.employee,
            absences: attendanceDto.absences.map((absenceDto) => ({
                id: absenceDto.id,
                employeeId: absenceDto.employeeId,
                startDate: new Date(absenceDto.startDate),
                endDate: new Date(absenceDto.endDate),
                reason: absenceDto.reason ?? null,
            })),
        }))
    }

    async addEmployee(employee: Employee) {
        const url = new URL(this.baseURL)
        url.pathname = `/employees`
        await this.client.post(url, employee)
    }

    async removeEmployee(id: string) {
        const url = new URL(this.baseURL)
        url.pathname = `/employees/${id}`
        await this.client.delete(url)
    }
}
