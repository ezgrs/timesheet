import { Module } from "@nestjs/common"
import { AbsenceController } from "../controllers/absence.controller.js"
import { TypeORMAbsenceRepository } from "../services/typeorm-absence.repository.js"

@Module({
    controllers: [AbsenceController],
    providers: [TypeORMAbsenceRepository],
})
export class AbsenceModule {}
