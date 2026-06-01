import { Injectable } from "@nestjs/common";
import { AttendanceStore } from "../../../application/ports/AttendanceStore";
import { Attendance } from "../../../domain/entities/Attendance";
import dataSource from "../data-source";
import { LessThan, MoreThanOrEqual } from "typeorm";
import { EmployeeEntity } from "../entities/EmployeeEntity";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import { AbsenceMapper } from "../mappers/AbsenceMapper";

@Injectable()
export class TypeORMAttendanceStore implements AttendanceStore {
    async readAll(year: number, month: number): Promise<Attendance[]> {
        const employeeEntities = await dataSource.manager.find(
            EmployeeEntity,
            {
                relations: {absences: true},
                where: {
                    absences: {
                        startDate: LessThan(new Date(Date.UTC(year, month + 1, 1))),
                        endDate: MoreThanOrEqual(new Date(Date.UTC(year, month, 1))),
                    },
                },
            }
        )
        return employeeEntities.map(employeeEntity => ({
            employee: EmployeeMapper.toDomain(employeeEntity),
            absences: employeeEntity.absences.map(AbsenceMapper.toDomain),
        }))
    }

}