import { Injectable } from "@nestjs/common"
import { AttendanceRepository } from "@/application/ports/attendance.repository.js"
import { Attendance } from "@/domain/entities/attendance.js"
import { LessThan, MoreThanOrEqual, Repository } from "typeorm"
import { EmployeeEntity } from "@/infrastructure/db/entities/employee.entity.js"
import { EmployeeMapper } from "@/infrastructure/db/mappers/employee.mapper.js"
import { AbsenceMapper } from "@/infrastructure/db/mappers/absence.mapper.js"
import { InjectRepository } from "@nestjs/typeorm"
import { AbsenceEntity } from "@/infrastructure/db/entities/absence.entity.js"
import { Absence } from "@/domain/entities/absence.js"

@Injectable()
export class TypeORMAttendanceRepository implements AttendanceRepository {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeesRepository: Repository<EmployeeEntity>,
        @InjectRepository(AbsenceEntity)
        private readonly absencesRepository: Repository<AbsenceEntity>,
    ) {}

    async readAll(year: number, month: number): Promise<Attendance[]> {
        const [employeesEntities, absencesEntities] = await Promise.all([
            this.employeesRepository.find(),
            this.absencesRepository.find({
                where: {
                    startDate: LessThan(new Date(Date.UTC(year, month + 1, 1))),
                    endDate: MoreThanOrEqual(
                        new Date(Date.UTC(year, month, 1)),
                    ),
                },
            }),
        ])
        const groups = new Map<string, Absence[]>()
        for (const absenceEntity of absencesEntities) {
            const employeeId = absenceEntity.employeeId
            const absences = groups.get(employeeId) ?? []
            absences.push(AbsenceMapper.toDomain(absenceEntity))
            groups.set(employeeId, absences)
        }
        return employeesEntities.map(employeeEntity => ({
            employee: EmployeeMapper.toDomain(employeeEntity),
            absences: groups.get(employeeEntity.id) ?? [],
        }))
    }
}
