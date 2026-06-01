import { Module } from "@nestjs/common"
import { AbsenceController } from "../controllers/absence.controller"
import { TypeORMAbsenceRepository } from "../services/typeorm-absence.repository"

@Module({
    controllers: [AbsenceController],
    providers: [TypeORMAbsenceRepository],
})
export class AbsenceModule {}
