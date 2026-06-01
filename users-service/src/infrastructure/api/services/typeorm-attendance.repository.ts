import { Injectable } from "@nestjs/common"
import { AttendanceRepository } from "@/application/ports/attendance.repository.js"
import { Attendance } from "@/domain/entities/attendance.js"
import { DataSource, LessThan, MoreThanOrEqual } from "typeorm"
import { EmployeeEntity } from "@/infrastructure/db/entities/employee.entity.js"
import { EmployeeMapper } from "@/infrastructure/db/mappers/employee.mapper.js"
import { AbsenceMapper } from "@/infrastructure/db/mappers/absence.mapper.js"

@Injectable()
export class TypeORMAttendanceRepository implements AttendanceRepository {
    constructor(private readonly dataSource: DataSource) {}

    async readAll(year: number, month: number): Promise<Attendance[]> {
        const employeeEntities = await this.dataSource.manager.find(
            EmployeeEntity,
            {
                relations: { absences: true },
                where: {
                    absences: {
                        startDate: LessThan(
                            new Date(Date.UTC(year, month + 1, 1)),
                        ),
                        endDate: MoreThanOrEqual(
                            new Date(Date.UTC(year, month, 1)),
                        ),
                    },
                },
            },
        )
        return employeeEntities.map((employeeEntity) => ({
            employee: EmployeeMapper.toDomain(employeeEntity),
            absences: employeeEntity.absences.map(AbsenceMapper.toDomain),
        }))
    }
}
