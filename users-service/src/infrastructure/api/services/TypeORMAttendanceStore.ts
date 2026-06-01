import { Injectable } from "@nestjs/common"
import { AttendanceStore } from "../../../application/ports/AttendanceStore"
import { Attendance } from "../../../domain/entities/Attendance"
import { DataSource, LessThan, MoreThanOrEqual } from "typeorm"
import { EmployeeEntity } from "../../db/entities/EmployeeEntity"
import { EmployeeMapper } from "../../db/mappers/EmployeeMapper"
import { AbsenceMapper } from "../../db/mappers/AbsenceMapper"

@Injectable()
export class TypeORMAttendanceStore implements AttendanceStore {
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
