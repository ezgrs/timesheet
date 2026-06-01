import { Module } from "@nestjs/common"
import { AbsenceController } from "../controllers/AbsenceController"
import { TypeORMAbsenceRepository } from "../services/TypeORMAbsenceRepository"

@Module({
    controllers: [AbsenceController],
    providers: [TypeORMAbsenceRepository],
})
export class AbsenceModule {}
