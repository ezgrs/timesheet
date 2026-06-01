import { Injectable } from "@nestjs/common"
import { AttendanceRepository } from "@/application/ports/attendance.repository.js"
import { Attendance } from "@/domain/entities/attendance.js"
import { LessThan, MoreThanOrEqual, Repository } from "typeorm"
import { EmployeeEntity } from "@/infrastructure/db/entities/employee.entity.js"
import { EmployeeMapper } from "@/infrastructure/db/mappers/employee.mapper.js"
import { AbsenceMapper } from "@/infrastructure/db/mappers/absence.mapper.js"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class TypeORMAttendanceRepository implements AttendanceRepository {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly repository: Repository<EmployeeEntity>,
    ) {}

    async readAll(year: number, month: number): Promise<Attendance[]> {
        const employeeEntities = await this.repository.find(
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
