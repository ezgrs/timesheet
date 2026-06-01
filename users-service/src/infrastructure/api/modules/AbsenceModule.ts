import { Module } from "@nestjs/common"
import { AbsenceController } from "../controllers/AbsenceController"
import { TypeORMAbsenceStore } from "../services/TypeORMAbsenceStore"

@Module({
    controllers: [AbsenceController],
    providers: [TypeORMAbsenceStore],
})
export class AbsenceModule {}
